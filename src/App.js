import React from "react";

import { Provider } from "react-redux";
import store from "./store";

import "./template/dependencies";
import Header from "./template/header";
import Dashboard from "./dashboard/dashboard";
import Accordion from "./template/accordion";
import Title from "./template/title";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Title />
        <Dashboard />
        <Accordion />
      </div>
    </Provider>
  );
}

export default App;
