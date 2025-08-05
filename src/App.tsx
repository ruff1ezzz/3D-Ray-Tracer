import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import CodeShowcase from './components/CodeShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <Gallery />
      <CodeShowcase />
      <Footer />
    </div>
  );
}

export default App;
