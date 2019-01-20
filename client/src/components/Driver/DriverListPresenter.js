import React from 'react';
import PropTypes from 'prop-types';
import DriverListItem from './DriverListItem';

import { generateRandomId, getDriverPosition } from '../../util/utils';

const DriverListPresenter = ({ driverLocation, stopsData }) => {
  if (driverLocation.activeLegID === '' || stopsData.length === 0) {
    return <h4>Loading Drivers Data...</h4>;
  }
  const renderDriver = (
    <DriverListItem
      driver={driverLocation}
      cord={getDriverPosition(stopsData, driverLocation)}
      key={generateRandomId()}
    />
  );
  return (
    <section className="drivers">
      <h2>Main Driver</h2>
      {renderDriver}
    </section>
  );
};

export default DriverListPresenter;

DriverListPresenter.propTypes = {
  stopsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
