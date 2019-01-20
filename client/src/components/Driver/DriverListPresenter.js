import React from 'react';
import DriverListItem from './DriverListItem';
import { generateRandomId, getDriverPosition } from '../../util/utils';

const LegListPresenter = ({ driverLocation, stopsData }) => {
  if (driverLocation.activeLegID === '' || stopsData.length === 0) {
    return <h4>Loading Drivers Data...</h4>;
  }
  const renderDriver = (
    <DriverListItem
      driver={driverLocation}
      cord={getDriverPosition(stopsData, driverLocation)}
      key={generateRandomId()}
    />
  );
  const renderBonusDriver = (
    <DriverListItem
      driver={driverLocation}
      cord={getDriverPosition(stopsData, driverLocation)}
      key={generateRandomId()}
    />
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
