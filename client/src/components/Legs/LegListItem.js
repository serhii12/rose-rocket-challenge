import React from 'react';
import PropTypes from 'prop-types';

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

LegListItem.propTypes = {
  leg: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
      PropTypes.string.isRequired,
    ]).isRequired
  ).isRequired,
  completed: PropTypes.bool.isRequired,
  current: PropTypes.bool.isRequired,
};
