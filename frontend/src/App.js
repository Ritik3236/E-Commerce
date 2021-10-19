import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import WebFont from 'webfontloader';
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer';
import Home from './components/home/Home';


function App() {

  useEffect(() => {

    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Droid Serif']
      }
    })
  }, [])

  return (
    <>
      <Router>
        <Header />
        <Home />
        <Footer />
      </Router>
    </>
  );
}

export default App;
