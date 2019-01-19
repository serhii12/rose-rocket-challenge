import React from 'react';

const DriverListItem = ({ driver }) => (
  <div className="drivers__info card">
    <div className="drivers__info__details">
      <div className="drivers__info__details__name">
        <h3>driver🚚</h3>
      </div>
      <div className="drivers__info__details__location">
        <p>Active Leg: {driver.activeLegID}</p>
        <p>Leg Progress: {driver.legProgress}%</p>
        <p>Coordinates: 20X|20Y</p>
      </div>
    </div>
  </div>
);
export default DriverListItem;
