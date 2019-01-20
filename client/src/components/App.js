import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header/Header';
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
    SOCKET.onmessage = () => {
      const { fetchDriverLocation } = this.props;
      fetchDriverLocation();
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
            {({
              driverLocation,
              stopsData,
              legsData,
              updateDriverLocation,
            }) => (
              <>
                <DriverListPresenter
                  stopsData={stopsData}
                  driverLocation={driverLocation}
                />
                <Controls
                  updateDriverLocation={updateDriverLocation}
                  legsData={legsData}
                />
                <LegListPresenter
                  driverLocation={driverLocation}
                  legsData={legsData}
                />
                <MapItem
                  stopsData={stopsData}
                  driverLocation={driverLocation}
                />
              </>
            )}
          </StoreContext.Consumer>
        </main>
      </>
    );
  }
}

App.propTypes = {
  fetchDriverLocation: PropTypes.func.isRequired,
};
