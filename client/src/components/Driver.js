import React from 'react';

const Driver = ({ driver }) => (
  <div className="drivers__info card">
    <div className="drivers__info__details card__details">
      <div className="drivers__info__details__online information">● online</div>
      <div className="drivers__info__details__name">
        <h3>
          <strong>roserocket ❤️</strong>
        </h3>
      </div>
      <div className="drivers__info__details__location">
        <p>Active Leg: {driver.activeLegID}</p>
        <p>Leg Progress: {driver.legProgress}%</p>
        <p>Coordinates: 20X 20Y</p>
      </div>
    </div>
  </div>
);
export default Driver;
