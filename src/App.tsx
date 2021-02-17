import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import './App.css';

const App = () => {
  return (
    <div>
      <Header/>
      <div className="wrapper">
        <Navbar/>
        <Profile/>
      </div>
    </div>
  );
}


export default App;
