import React, { Component } from "react";
import "./css/App.css";
import "./css/css/weather-icons.min.css";
import Cards from "./components/cards/index";
import Hourly from "./components/hourly/index";
import { Switch, Route } from "react-router";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Cards} />
          <Route path='/:city/:day' component={Hourly} />
        </Switch>
      </div>
    );
  }
}

export default App;
