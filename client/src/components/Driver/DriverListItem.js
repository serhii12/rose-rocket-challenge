import React from 'react';
import PropTypes from 'prop-types';

const DriverListItem = ({ driver, cord }) => (
  <div className="drivers__info card">
    <div className="drivers__info__details">
      <div className="drivers__info__details__name">
        <h3>driver🚚</h3>
      </div>
      <div className="drivers__info__details__location">
        <p>Active Leg: {driver.activeLegID}</p>
        <p>Leg Progress: {driver.legProgress}%</p>
        <p>
          Coordinates: {cord[0] / 6}X | {cord[1] / 6}Y
        </p>
      </div>
    </div>
  </div>
);
export default DriverListItem;

DriverListItem.propTypes = {
  driver: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]).isRequired
  ),
  cord: PropTypes.arrayOf(PropTypes.number).isRequired,
};
