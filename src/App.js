import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import DrawerAppBar from './Components/navbar.js';
import Home from './Components/home.js';

function App() {
  return (
    <Router>
      <div className="App">
        <DrawerAppBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;