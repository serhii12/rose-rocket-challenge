import React from 'react';
import Leg from './Leg';

const LegsList = ({ legsData, driverLocation }) => {
  const renderList = legsData.map(leg => (
    <Leg
      key={leg.legID}
      hasCompleted
      leg={leg}
      driverLocation={driverLocation}
    />
  ));

  return (
    <div className="legs overflow col">
      <h2>Legs</h2>
      {renderList}
    </div>
  );
};
export default LegsList;
