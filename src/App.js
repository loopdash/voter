import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from './Home';
import About from './About';
import Typography from 'typography';
import theme from 'typography-theme-grand-view';
const typography = new Typography(theme);
typography.injectStyles()

function App() {
  let appClass = window === window.parent ? 'wrapper' : null;

  var url = (window.location !== window.parent.location)
            ? document.referrer
            : document.location.href;
  console.log('url');
  console.log(url);
  return (
    <div className={`App ${appClass}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
