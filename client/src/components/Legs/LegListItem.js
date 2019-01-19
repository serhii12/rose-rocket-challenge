import React from 'react';

const LegListItem = ({ leg, completed, current }) => {
  const isCompleted = (
    <div className="legs__info__details__isCompleted ">☑️Completed</div>
  );
  const isCurrent = (
    <div className="legs__info__details__isCurrent ">🙋Current</div>
  );

  return (
    <div className="legs__info card">
      <div className="legs__info__details">
        {completed && isCompleted}
        {current && isCurrent}
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

export default LegListItem;
