import React, { Component } from 'react';
import Header from './Header';
import DriversList from './DriversList';
import InfoMenu from './InfoMenu';
import LegsList from './LegsList';
import Map from './Map';
import '../styles/App.css';

export default class App extends Component {
  state = {
    legsData: [],
    stopsData: [],
    driverLocation: [],
    currentStop: '',
  };

  async componentDidMount() {
    try {
      const legs = this.getLegs();
      const stops = this.getStops();
      const data = await Promise.all([legs, stops]);
      this.setState({
        legsData: [...data[0]],
        stopsData: [...data[1]],
      });
      console.log('Data is here');
    } catch (error) {
      console.log('error', error);
    }
  }

  getLegs = async () => {
    try {
      const response = await fetch('/api/legs');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (error) {
      console.log('error getting legs data', error);
    }
  };

  getStops = async () => {
    try {
      const response = await fetch('/api/stops');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (error) {
      console.log('error getting stops data', error);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
  };

  render() {
    const { legsData, stopsData } = this.state;
    return (
      <div className="App">
        <Header />
        <div className="wrapper">
          <div className="content">
            <DriversList />
            <InfoMenu />
            <LegsList legsData={legsData} />
          </div>
        </div>
        <div className="wrapper">
          <div className="content">
            <Map stopsData={stopsData} />
          </div>
        </div>
      </div>
    );
  }
}
