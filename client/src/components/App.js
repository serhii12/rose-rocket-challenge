import React, { Component } from 'react';
import Header from './Header';
import DriversList from './DriversList';
import InfoMenu from './InfoMenu';
import LegsList from './LegsList';
import Map from './Map';
import '../styles/App.css';

const SOCKET = new WebSocket('ws://localhost:5000');

export default class App extends Component {
  state = {
    legsData: [],
    stopsData: [],
    driverLocation: {
      activeLegID: '',
      legProgress: null,
    },
    currentStop: '',
    loading: true,
  };

  async componentDidMount() {
    try {
      const legs = this.getDataFromApi('legs');
      const stops = this.getDataFromApi('stops');
      const driver = this.getDataFromApi('driver');
      const data = await Promise.all([legs, stops, driver]);
      const [legsData, stopsData, driverLocation] = data;
      const { activeLegID, legProgress } = driverLocation;
      this.setState({
        loading: false,
        legsData: [...legsData],
        stopsData: [...stopsData],
        driverLocation: {
          activeLegID,
          legProgress: parseInt(legProgress, 10),
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  getDataFromApi = async data => {
    try {
      const response = await fetch(`/api/${data}`);
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (error) {
      console.log('error getting legs data', error);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
  };

  render() {
    const { legsData, stopsData, driverLocation, loading } = this.state;
    if (loading) {
      // Wait for async data
      return null;
    }
    return (
      <div className="App">
        <Header />
        <div className="wrapper">
          <div className="content">
            <DriversList driverLocation={driverLocation} />
            <InfoMenu driverLocation={driverLocation} legsData={legsData} />
            <LegsList legsData={legsData} driverLocation={driverLocation} />
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
