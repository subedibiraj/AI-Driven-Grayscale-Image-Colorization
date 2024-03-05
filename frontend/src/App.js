import './App.css';
import React, { useState} from "react";
import Navbar from './components/Navbar';
import Title from './components/Title';
import Body from './components/Body';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Slides from './components/Slides';
import Processing from './components/Processing';
import { Route,Routes, BrowserRouter } from 'react-router-dom';
import About from './components/About';

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route exact path="/" element ={<>
    {!loading?<Title  setLoading={setLoading}/>:<Processing setLoading={setLoading} loading={loading}/>}
    <Body/>
    <Faq/>
    <Slides/>
    </>}/>
    <Route exact path="/about" element ={<About setLoading={setLoading}/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
