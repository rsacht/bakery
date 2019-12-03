import './template/dependencies'
import React from 'react';
import Header from './template/header';
import Dashboard from './dashboard/dashboard'
import Accordion from './template/accordion'
import Title from './template/title'
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <Title />
      <Dashboard />
      <Accordion />
    </div>
  );
}

export default App;
