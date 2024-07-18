import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Home Page</h1>
      <Link to="/app">
        <button>Go to App</button>
      </Link>
    </div>
  );
}

export default Home;
