import React, { Component } from 'react';
import Header from './Reusable/Header';
import DriverListPresenter from './Driver/DriverListPresenter';
import Controls from './ControlMenu/Controls.js';
import LegListPresenter from './Legs/LegListPresenter';
import MapItem from './Map/MapItem';
import '../styles/App.css';
import { StoreContext } from './StoreContext/StoreProvider';

const SOCKET = new WebSocket('ws://localhost:5000');

export default class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    SOCKET.onmessage = msg => {
      this.props.fetchDriverLocation();
    };
    this.setState({
      loading: false,
    });
  }

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
            {({ driverLocation, stopsData }) => (
              <DriverListPresenter
                stopsData={stopsData}
                driverLocation={driverLocation}
              />
            )}
          </StoreContext.Consumer>
          <StoreContext.Consumer>
            {({ legsData, updateDriverLocation }) => (
              <Controls
                updateDriverLocation={updateDriverLocation}
                legsData={legsData}
              />
            )}
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
              <MapItem stopsData={stopsData} driverLocation={driverLocation} />
            )}
          </StoreContext.Consumer>
        </main>
      </>
    );
  }
}
