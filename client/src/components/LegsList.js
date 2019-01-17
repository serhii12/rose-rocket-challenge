import React from 'react';
import Leg from './Leg';

const LegsList = ({ legsData }) => {
  const renderList = legsData.map(leg => <Leg key={leg.legID} leg={leg} />);

  return (
    <div className="legs col">
      <h2>Legs</h2>
      {renderList}
    </div>
  );
};
export default LegsList;
