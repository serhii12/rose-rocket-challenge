import React from 'react';
import Driver from './Driver';

const DriversList = props => {
  const renderList = [1, 2, 3].map(driver => <Driver driver={driver} />);

  return (
    <div className="drivers overflow col">
      <h2>Drivers</h2>
      {renderList}
    </div>
  );
};
export default DriversList;
