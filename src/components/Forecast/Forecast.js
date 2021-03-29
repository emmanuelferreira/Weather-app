import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

class Forecast extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      city: '',
      responseObj: {},
      unit: 'imperial',
      error: false,
      loading: false
    }
  }

  getForecast = (event) => {
    event.preventDefault();
    if(this.state.city.length === 0) { this.setState({error: true})}
    // Clear state in preparation for new data
    this.setState({
      error: false,
      loading: true
    });

    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== "200") { throw new Error() }
      this.setState({
        responseObj: data,
        loading:false
      })
    })
    .catch(err => {
        this.setState({
          loading:false,
          error: true
        })
    });
  }

  render() {
    return (
      <div>
          <h2>Find Current Weather Conditions</h2>
          <form onSubmit={this.getForecast}>
              <input
                  type="text"
                  placeholder="Enter City"
                  maxLength="50"
                  className={classes.textInput}
                  value={this.state.city}
                  onChange={(e) => this.setState({city: e.target.value})}
                  />
              <label className={classes.Radio}>
                  <input
                      type="radio"
                      name="units"
                      checked={this.state.unit === "imperial"}
                      value="imperial"
                      onChange={(e) => this.setState({unit: e.target.value})}
                      />
                  Fahrenheit
              </label>
              <label className={classes.Radio}>
                  <input
                      type="radio"
                      name="units"
                      checked={this.state.unit === "metric"}
                      value="metric"
                      onChange={(e) => this.setState({unit: e.target.value})}
                      />
                  Celcius
              </label>

              <button className={classes.Button} type="submit">Get Forecast</button>
          </form>
          <Conditions
            responseObj={this.state.responseObj}
            error={this.state.error}
            loading={this.state.loading}
          />
      </div>
    )
  }
}

export default Forecast;
