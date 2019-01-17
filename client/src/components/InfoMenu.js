import React, { Component } from 'react';

export default class InfoMenu extends Component {
  render() {
    return (
      <div className="info">
        <h2>Info</h2>
        <div className="info__activeLeg card">
          <p>Active Leg</p>
          <p>legProgress</p>
        </div>
      </div>
    );
  }
}
