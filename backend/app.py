import base64
import os
from typing import Any, Dict, List, TypedDict

import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from langgraph.graph import StateGraph, END

GITHUB_API_URL = os.getenv("GITHUB_API_URL", "https://github.com/api/v3")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
DEFAULT_OWNER = os.getenv("GITHUB_OWNER", "")
DEFAULT_REPO = os.getenv("GITHUB_REPO", "")
DEFAULT_BRANCH = os.getenv("GITHUB_DEFAULT_BRANCH", "main")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", "8000"))

app = FastAPI(title="GKE GitHub Enterprise Backend", version="0.1.0")


class DirectoryRequest(BaseModel):
    owner: str = Field(default="", description="GitHub Enterprise org or owner")
    repo: str = Field(default="", description="Target repository name")
    branch: str = Field(default=DEFAULT_BRANCH, description="Target branch")
    directory: str = Field(..., description="Directory path to create inside the repo")
    message: str = Field(default="Create directory via LangGraph", description="Git commit message")
    file_name: str = Field(default=".gitkeep", description="File used to create the folder")
    content: str = Field(default="", description="Optional file contents")
    commit_author_name: str | None = Field(default=None)
    commit_author_email: str | None = Field(default=None)


class WorkflowState(TypedDict):
    owner: str
    repo: str
    branch: str
    directory: str
    message: str
    file_name: str
    content: str
    status: str
    steps: List[str]
    result: Dict[str, Any]


def _github_headers() -> Dict[str, str]:
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    return headers


def create_directory_in_github(owner: str, repo: str, branch: str, directory: str, message: str, file_name: str = ".gitkeep", content: str = "", commit_author_name: str | None = None, commit_author_email: str | None = None) -> Dict[str, Any]:
    if not GITHUB_TOKEN:
        raise HTTPException(status_code=500, detail="GITHUB_TOKEN is not configured")

    clean_directory = directory.strip("/")
    if not clean_directory:
        raise HTTPException(status_code=400, detail="directory is required")

    encoded = base64.b64encode((content or "").encode("utf-8")).decode("utf-8")
    target_path = f"{clean_directory}/{file_name}".strip("/")
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo}/contents/{target_path}"

    payload: Dict[str, Any] = {
        "branch": branch,
        "message": message,
        "content": encoded,
    }

    if commit_author_name or commit_author_email:
        payload["committer"] = {
            "name": commit_author_name or "GitHub Automation",
            "email": commit_author_email or "automation@example.com",
        }

    response = requests.put(url, headers=_github_headers(), json=payload, timeout=30)
    if response.status_code >= 400:
        detail = response.text
        try:
            detail = response.json()
        except ValueError:
            pass
        raise HTTPException(status_code=response.status_code, detail={"github_error": detail})

    payload = response.json()
    return {
        "status": "created",
        "owner": owner,
        "repo": repo,
        "branch": branch,
        "path": target_path,
        "html_url": payload.get("content", {}).get("html_url"),
        "commit_sha": payload.get("commit", {}).get("sha"),
    }


def validate_inputs(state: WorkflowState) -> WorkflowState:
    owner = state["owner"] or DEFAULT_OWNER
    repo = state["repo"] or DEFAULT_REPO
    if not owner or not repo:
        raise HTTPException(status_code=400, detail="owner and repo are required")

    state["owner"] = owner
    state["repo"] = repo
    state["branch"] = state.get("branch") or DEFAULT_BRANCH
    state["steps"] = ["validated_inputs"]
    state["status"] = "validated"
    return state


def create_repo_directory_node(state: WorkflowState) -> WorkflowState:
    result = create_directory_in_github(
        owner=state["owner"],
        repo=state["repo"],
        branch=state["branch"],
        directory=state["directory"],
        message=state["message"],
        file_name=state["file_name"],
        content=state["content"],
    )
    state["result"] = result
    state["status"] = "completed"
    state["steps"] = state.get("steps", []) + ["directory_created"]
    return state


workflow = StateGraph(WorkflowState)
workflow.add_node("validate_inputs", validate_inputs)
workflow.add_node("create_repo_directory", create_repo_directory_node)
workflow.set_entry_point("validate_inputs")
workflow.add_edge("validate_inputs", "create_repo_directory")
workflow.add_edge("create_repo_directory", END)
compiled_workflow = workflow.compile()


@app.get("/health")
def health() -> Dict[str, Any]:
    return {
        "ok": True,
        "service": "github-enterprise-langgraph",
        "port": BACKEND_PORT,
    }


@app.post("/api/create-directory")
def create_directory(request: DirectoryRequest) -> Dict[str, Any]:
    state: WorkflowState = {
        "owner": request.owner or DEFAULT_OWNER,
        "repo": request.repo or DEFAULT_REPO,
        "branch": request.branch or DEFAULT_BRANCH,
        "directory": request.directory,
        "message": request.message,
        "file_name": request.file_name,
        "content": request.content,
        "status": "pending",
        "steps": [],
        "result": {},
    }

    final_state = compiled_workflow.invoke(state)
    return {
        "status": final_state["status"],
        "steps": final_state["steps"],
        "result": final_state.get("result", {}),
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("backend.app:app", host="0.0.0.0", port=BACKEND_PORT, reload=False)
