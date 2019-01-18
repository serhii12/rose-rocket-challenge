import React from 'react';
import Driver from './Driver';
import { generateRandomId } from '../util/utils';

const DriversList = ({ driverLocation }) => {
  console.log('driverLocation', driverLocation);
  const renderDriver = (
    <Driver driver={driverLocation} key={generateRandomId()} />
  );
  return (
    <div className="drivers overflow col">
      <h2>Drivers</h2>
      {renderDriver}
    </div>
  );
};
export default DriversList;
