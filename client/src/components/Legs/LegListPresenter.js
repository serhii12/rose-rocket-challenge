import React from 'react';
import PropTypes from 'prop-types';
import LegListItem from './LegListItem';

const LegListPresenter = ({ legsData, driverLocation }) => {
  if (legsData.length === 0) {
    return <h4>Loading Legs Data...</h4>;
  }

  const list = legsData.map((leg, i, arr) => (
    <LegListItem
      key={leg.legID}
      leg={leg}
      completed={
        i < arr.findIndex(el => el.legID === driverLocation.activeLegID)
      }
      current={leg.legID === driverLocation.activeLegID}
    />
  ));
  return (
    <section className="legs">
      <h2>Legs</h2>
      {list}
    </section>
  );
};

export default LegListPresenter;

LegListPresenter.propTypes = {
  legsData: PropTypes.arrayOf(
    PropTypes.shape({
      startStop: PropTypes.string.isRequired,
      endStop: PropTypes.string.isRequired,
      speedLimit: PropTypes.number.isRequired,
      legID: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
