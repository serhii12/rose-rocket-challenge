import React, { Component } from 'react';
import { trackingAPI } from '../../util/utils';

export const StoreContext = React.createContext();

export class StoreProvider extends Component {
  state = {
    legsData: [],
    stopsData: [],
    driverLocation: {
      activeLegID: '',
      legProgress: null,
    },
  };

  componentDidMount() {
    this.fetchLegs();
    this.fetchStops();
    this.fetchDriverLocation();
  }

  fetchLegs = async () => {
    const legsData = await trackingAPI.getDataFromApi('legs');
    this.setState({
      legsData,
    });
  };

  fetchStops = async () => {
    const stopsData = await trackingAPI.getDataFromApi('stops');
    this.setState({
      stopsData,
    });
  };

  fetchDriverLocation = async () => {
    const driverLocation = await trackingAPI.getDataFromApi('driver');
    const { activeLegID, legProgress } = driverLocation;
    this.setState({
      driverLocation: {
        activeLegID,
        legProgress: parseInt(legProgress, 10),
      },
    });
  };

  render() {
    const { children } = this.props;
    return (
      <StoreContext.Provider
        value={{
          ...this.state,
          fetchDriverLocation: this.fetchDriverLocation,
        }}
      >
        {children}
      </StoreContext.Provider>
    );
  }
}
