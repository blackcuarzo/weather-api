import React from "react";
import './App.css';
import WeatherList from './components/WeatherList'

//import logo from './icons/leanTech.svg'
import leanTech from './icons/leanTech.svg'
import dashBoard from './icons/dashboard.svg'

function App() {
  return (
    <div className = "appBox"> 
      <div className = "sideBar">
          <div>
            <img src={leanTech} className="App-logo" alt="logo" />
          </div>
          <div>
            <img src={dashBoard} className="App-logo" alt="logo" />
          </div>
      </div>
      <div>
        <WeatherList/>
      </div>
    </div>
  );
}

export default App;
