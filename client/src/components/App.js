import React, { Component } from 'react';
import Header from './Header';
import DriversList from './DriversList';
import InfoMenu from './InfoMenu';
import LegsList from './LegsList';
import Map from './Map';
import '../styles/App.css';
import { trackingAPI } from '../util/utils';

const SOCKET = new WebSocket('ws://localhost:5000');

export default class App extends Component {
  state = {
    legsData: [],
    stopsData: [],
    driverLocation: {
      activeLegID: '',
      legProgress: null,
    },
    loading: true,
  };

  async componentDidMount() {
    SOCKET.onmessage = msg => {};
    try {
      const legs = trackingAPI.getDataFromApi('legs');
      const stops = trackingAPI.getDataFromApi('stops');
      const driver = trackingAPI.getDataFromApi('driver');
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

  updateDriverLocation = async (legToUpdate, progress) => {
    try {
      trackingAPI.updateLocation(legToUpdate, progress);
    } catch (error) {
      console.log(error);
    }
    // const newMessage = {
    //   legToUpdate: legToUpdate,
    //    progress: progress,
    // };
    // SOCKET.send(JSON.stringify(newMessage));
  };

  render() {
    const { legsData, stopsData, driverLocation, loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <div className="App">
        <Header />
        <div className="wrapper">
          <div className="content">
            <DriversList driverLocation={driverLocation} />
            <InfoMenu
              driverLocation={driverLocation}
              legsData={legsData}
              updateDriverLocation={this.updateDriverLocation}
            />
            <LegsList legsData={legsData} driverLocation={driverLocation} />
          </div>
        </div>
        <div className="wrapper">
          <div className="deliveryMap">
            <Map stopsData={stopsData} />
          </div>
        </div>
      </div>
    );
  }
}
