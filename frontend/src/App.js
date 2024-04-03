import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyMap from "./components/MyMap";
import Upload from "./components/Upload";
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        {/* Route for the Upload component */}
        <Routes>
        <Route exact path="/dashboard" element={<Upload/>} />
        {/* Route for the MyMap component with a filename parameter */}
        <Route path="/map/:filename" element={<MyMap/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App