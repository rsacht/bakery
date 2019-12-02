import './template/dependencies'
import React from 'react';
import Header from './template/header';
import Dashboard from './dashboard/dashboard'
import Accordion from './template/accordion'
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <Accordion />
    </div>
  );
}

export default App;
