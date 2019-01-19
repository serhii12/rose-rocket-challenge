import React from 'react';
import DriverListItem from './DriverListItem';
import { generateRandomId } from '../../util/utils';

const LegListPresenter = ({ driverLocation }) => {
  if (
    Object.keys(driverLocation).length === 0 &&
    driverLocation.constructor === Object
  ) {
    return <h4>Loading Drivers Data...</h4>;
  }
  const renderDriver = (
    <DriverListItem driver={driverLocation} key={generateRandomId()} />
  );
  const renderBonusDriver = (
    <DriverListItem driver={driverLocation} key={generateRandomId()} />
  );
  return (
    <section className="drivers">
      <h2>Drivers</h2>
      {renderDriver}
      {renderBonusDriver}
    </section>
  );
};

export default LegListPresenter;
