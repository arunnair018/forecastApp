import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import Jumbo from "../cards/jumbo";
import { VictoryLine, VictoryChart } from "victory";

// hourly data component
class Hourly extends Component {
  constructor(props) {
    super(props);
    this.city = props.match.params.city.toLowerCase();
    this.day = props.match.params.day.toLowerCase();
  }

  state = {
    load: false,
    graphData: [],
    processed: [],
    info: {},
    outOfScope: false,
  };

  // process data to get hourly data of given day
  dataProcessor = (data) => {
    let result;
    let weekday = [
      "sunday",
      "monday",
      "teusday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    let processed = this.groupBy(data);
    console.log(processed);
    for (let x in processed) {
      let dataday = new Date(x).getDay();
      if (weekday[dataday] === this.day) {
        result = processed[x];
        break;
      } else {
        result = [];
      }
    }
    if (result.length < 2) {
      this.setState({
        outOfScope: true,
        load: true,
      });
      return;
    }
    let viz = result.map((item) => {
      return { time: item.dt_txt.slice(11, 16), temp: item.main.temp };
    });
    console.log(viz);

    this.setState({
      graphData: viz,
      processed: result,
      load: true,
    });
  };

  // group data by date
  groupBy = (arr) => {
    return _.groupBy(arr, function (a) {
      return a.dt_txt.slice(0, 10);
    });
  };

  // fetch data from api
  getData = () => {
    let apiKey = "2c3f612b1d20052d68380b77583f8bc3";
    let city = this.city || "delhi";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=${apiKey}`
      )
      .then((res) => {
        this.setState({
          info: res.data.city,
        });
        this.dataProcessor(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetch initial data
  componentWillMount() {
    this.getData();
  }

  //render function
  render() {
    // wait till data loads
    if (!this.state.load) {
      return "";
    }

    // if day out of scope
    if (this.state.outOfScope) {
      return (
        <div className='jumbo'>
          <center>
            <h2>Forecast available of only 5 days/ 3 hourly</h2>
            <h4>
              get subscription at{" "}
              <a href='https://openweathermap.org/'>openweathermap.org</a> for
              more features.
            </h4>
          </center>
        </div>
      );
    }

    //set variables
    let data = this.state.processed;
    let info = this.state.info;
    let gdata = this.state.graphData;
    let label = gdata.map((item) => item.temp);

    // return JSX
    return (
      <div>
        <Jumbo
          data={data}
          info={info}
          day={this.day.charAt(0).toUpperCase() + this.day.slice(1)}
        />
        <div className='chart'>
          <VictoryChart
            domainPadding={20}
            minDomain={{ y: 0 }}
            height={240}
            width={800}
          >
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: ".5px solid #ccc" },
              }}
              data={gdata}
              x='time'
              y='temp'
              labels={label}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default Hourly;
