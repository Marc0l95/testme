apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: secrets-store-csi-driver-role
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["create", "get", "list", "watch", "delete"]
  - apiGroups: ["secrets-store.csi.x-k8s.io"]
    resources: ["secretproviderclasses"]
    verbs: ["create", "get", "list", "watch", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: secrets-store-csi-driver-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: secrets-store-csi-driver-role
subjects:
  - kind: ServiceAccount
    name: secrets-store-csi-driver
    namespace: kube-system
