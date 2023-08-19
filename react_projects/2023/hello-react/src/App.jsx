import React, { Component } from 'react'
import { NavLink, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import './App.css'

export default class App extends Component {
  toHome = () => {
    console.log("to Home");
  }
  toAbout = () => {
    console.log("to About");
  }
  render() {
    return (
      <div>
        <h1>App</h1>
          <NavLink className={({isActive}) => isActive ? 'active' : ''} to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        <hr />
        <div>
          <Routes>
            <Route path="/about" element={<About />}/>
            <Route path="/home" element={<Home />}/>
          </Routes>
        </div>
      </div>
    )
  }
}
