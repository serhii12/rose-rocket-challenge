import React from 'react';

const Driver = props => (
  <div className="drivers__info card">
    <div className="drivers__info__details card__details">
      <div className="drivers__info__details__online information">● online</div>
      <div className="drivers__info__details__name">
        <h3>
          <strong>John Dear</strong>
        </h3>
      </div>
      <div className="drivers__info__details__location">
        <p>Current Stop: A</p>
        <p>Coordinates: 20x20</p>
        <p>Current Leg: FG</p>
      </div>
    </div>
  </div>
);
export default Driver;
