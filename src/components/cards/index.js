import React, { Component } from "react";
import axios from "axios";
import Forecast from "./forecast";
import _ from "lodash";
import Jumbo from "./jumbo";

// cards component
class Cards extends Component {
  state = {
    load: false,
    city: "",
    data: {},
  };

  // to aggregate data according to date
  groupBy = (arr) => {
    return _.groupBy(arr, function (a) {
      return a.dt_txt.slice(0, 11);
    });
  };

  // to fetch data from api
  getData = () => {
    let apiKey = process.env.REACT_APP_APIKEY;
    let city = this.state.city || "delhi";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=${apiKey}`
      )
      .then((res) => {
        this.setState({
          data: res.data,
          load: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // to capture keystroke for city input
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // to handle city form submission
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.city);
    this.getData();
  };

  // to get initial data when component mounts
  componentWillMount() {
    this.getData();
  }

  // to render the component
  render() {
    // wait until component loads the data
    if (!this.state.load) {
      return <div>Loading...</div>;
    }

    //set all variables
    var info = this.state.data.city;
    var list = this.state.data.list;
    var days = _.values(this.groupBy(list));
    var today = days.shift();

    // return JSX
    return (
      <div>
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
          <span class='navbar-brand'>{info.name}</span>
          <form className='form-inline ml-auto'>
            <input
              className='form-control mr-sm-2'
              type='text'
              placeholder='Search City'
              id='city'
              onChange={this.handleChange}
            />
            <button className='btn btn-success' onClick={this.handleSubmit}>
              Search
            </button>
          </form>
        </nav>
        <div className='deck'>
          <Jumbo data={today} info={info} />
          <center>
            {days.map((item, index) => {
              return <Forecast data={item} key={index} info={info} />;
            })}
          </center>
        </div>
      </div>
    );
  }
}

export default Cards;
