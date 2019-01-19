import React, { Component } from 'react';
import Header from './Reusable/Header';
import DriverListPresenter from './Driver/DriverListPresenter';
import Controls from './ControlMenu/Controls.js';
import LegListPresenter from './Legs/LegListPresenter';
import MapItem from './Map/MapItem';
import '../styles/App.css';
import { StoreContext } from './StoreContext/StoreProvider';

import { trackingAPI } from '../util/utils';

const SOCKET = new WebSocket('ws://localhost:5000');

export default class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    SOCKET.onmessage = msg => {
      console.log('MSG', JSON.parse(msg.data));
    };
    this.setState({
      loading: false,
    });
  }

  updateDriverLocation = async (legToUpdate, progress) => {
    try {
      trackingAPI.updateLocation(legToUpdate, progress);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return null;
    }
    return (
      <>
        <Header />
        <main className="wrapper">
          <StoreContext.Consumer>
            {({ driverLocation }) => (
              <DriverListPresenter
                driverLocation={driverLocation}
                updateDriverLocation={this.updateDriverLocation}
              />
            )}
          </StoreContext.Consumer>
          <StoreContext.Consumer>
            {({ legsData }) => <Controls legsData={legsData} />}
          </StoreContext.Consumer>
          <StoreContext.Consumer>
            {({ legsData, driverLocation }) => (
              <LegListPresenter
                driverLocation={driverLocation}
                legsData={legsData}
              />
            )}
          </StoreContext.Consumer>
          <StoreContext.Consumer>
            {({ stopsData, driverLocation }) => (
              <MapItem driverLocation={driverLocation} stopsData={stopsData} />
            )}
          </StoreContext.Consumer>
        </main>
      </>
    );
  }
}
