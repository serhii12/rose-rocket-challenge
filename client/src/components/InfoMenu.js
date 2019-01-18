import React, { Component } from 'react';

export default class InfoMenu extends Component {
  genereteOptions = name => (
    <option name={name} value={name}>
      {name}
    </option>
  );

  render() {
    const { legsData } = this.props;
    return (
      <div className="info">
        <h2>Update</h2>
        <div className="info__activeLeg card">
          <div className="info__activeLeg__wrapper">
            <form
              className="info__activeLeg__wrapper__form"
              action=""
              method=""
            >
              <h3>Which leg would you like to update?</h3>
              <select className="selectTime" name="timeTillReady">
                {legsData.map(el => this.genereteOptions(el.legID))}
              </select>
              <label className="visuallyhidden" htmlFor="legProgress">
                legProgress
              </label>
              <input
                type="number"
                id="legProgress"
                name="legProgress"
                min="0"
                max="100"
                placeholder="legProgress"
              />
              <button className="btn-checkout" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
