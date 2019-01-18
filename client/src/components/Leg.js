import React from 'react';

const Leg = ({ leg, driverLocation }) => {
  const hasCompleted = driverLocation.activeLegID === leg.legID &&
    driverLocation.legProgress === 100 && (
      <div className="drivers__info__details__online information">
        ☑️ completed
      </div>
    );
  return (
    <div className="legs__info card">
      <div className="legs__info__details card__details">
        {hasCompleted}
        <div className="legs__info__details__name">
          <h3>
            <strong>{leg.legID}</strong>
          </h3>
        </div>
        <div className="legs__info__details__location">
          <p>Starting Stop: {leg.startStop}</p>
          <p>Ending Stop: {leg.endStop}</p>
          <p>SpeedLimit: {leg.speedLimit}</p>
        </div>
      </div>
    </div>
  );
};

export default Leg;
