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
    bonusDriverLocation: {
      x: null,
      y: null,
    },
  };

  componentDidMount() {
    this.fetchLegs();
    this.fetchStops();
    this.fetchDriverLocation();
    this.fetchBonusDriverLocation();
  }

  fetchLegs = async () => {
    try {
      const legsData = await trackingAPI.getDataFromApi('legs');
      this.setState({
        legsData,
      });
    } catch (error) {
      console.log('error legsData', error);
    }
  };

  fetchStops = async () => {
    try {
      const stopsData = await trackingAPI.getDataFromApi('stops');
      this.setState({
        stopsData,
      });
    } catch (error) {
      console.log('error fetchStops', error);
    }
  };

  fetchDriverLocation = async () => {
    try {
      const driverLocation = await trackingAPI.getDataFromApi('driver');
      const { activeLegID, legProgress } = driverLocation;
      this.setState({
        driverLocation: {
          activeLegID,
          legProgress: parseInt(legProgress, 10),
        },
      });
    } catch (error) {
      console.log('error fetchDriverLocation', error);
    }
  };

  fetchBonusDriverLocation = async () => {
    try {
      const bonusDriverLocation = await trackingAPI.getDataFromApi(
        'bonusdriver'
      );
      const { x, y } = bonusDriverLocation;
      this.setState({
        bonusDriverLocation: {
          x,
          y,
        },
      });
    } catch (error) {
      console.log('error fetchBonusDriverLocation', error);
    }
  };

  updateDriverLocation = async (legToUpdate, progress) => {
    try {
      trackingAPI.updateLocation(legToUpdate, progress);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { children } = this.props;
    return (
      <StoreContext.Provider
        value={{
          ...this.state,
          fetchLegs: this.fetchLegs,
          fetchStops: this.fetchStops,
          fetchDriverLocation: this.fetchDriverLocation,
          updateDriverLocation: this.updateDriverLocation,
          fetchBonusDriverLocation: this.fetchBonusDriverLocation,
        }}
      >
        {children}
      </StoreContext.Provider>
    );
  }
}
