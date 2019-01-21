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
  componentDidMount() {
    SOCKET.onmessage = () => {
      const { fetchDriverLocation, fetchBonusDriverLocation } = this.props;
      fetchDriverLocation();
      fetchBonusDriverLocation();
    };
  }

  render() {
    return (
      <>
        <Header />
        <main className="wrapper">
          <StoreContext.Consumer>
            {({
              bonusDriverLocation,
              updateDriverLocation,
              updateBonusDriver,
              driverLocation,
              stopsData,
              legsData,
            }) => (
              <>
                <DriverListPresenter
                  stopsData={stopsData}
                  driverLocation={driverLocation}
                />
                <Controls
                  updateDriverLocation={updateDriverLocation}
                  updateBonusDriver={updateBonusDriver}
                  legsData={legsData}
                  driverLocation={driverLocation}
                />
                <LegListPresenter
                  driverLocation={driverLocation}
                  legsData={legsData}
                />
                <MapItem
                  bonusDriverLocation={bonusDriverLocation}
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
  fetchBonusDriverLocation: PropTypes.func.isRequired,
};
