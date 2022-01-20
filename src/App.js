import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navb from './Nav';
import { ParallaxProvider } from 'react-scroll-parallax';


function App() {

  return (
    <ParallaxProvider>
    <div className="App">
        <Navb />
    </div>
    </ParallaxProvider>
  );
}

export default App;
