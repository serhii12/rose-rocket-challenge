import React, { Component } from 'react';
import { generateRandomId } from '../util/utils';

export default class InfoMenu extends Component {
  state = {
    legToUpdate: this.props.driverLocation.activeLegID,
    legProgress: this.props.driverLocation.legProgress,
  };

  genereteOptions = name => {
    const {
      driverLocation: { activeLegID },
    } = this.props;
    return (
      <option
        name={name}
        key={generateRandomId()}
        value={name}
        selected={name === activeLegID}
      >
        {name}
      </option>
    );
  };

  onChangeLeg = (key, value) => {
    this.setState({ [key]: value });
  };

  onFormSubmit = e => {
    const { legToUpdate, legProgress } = this.state;
    const { updateDriverLocation } = this.props;
    e.preventDefault();
    if (legToUpdate !== '' && legProgress !== null) {
      updateDriverLocation(legToUpdate, legProgress);
      return false;
    }
  };

  render() {
    const { legsData } = this.props;
    const { legToUpdate, legProgress } = this.state;

    return (
      <div className="info">
        <h2>Update</h2>
        <div className="info__activeLeg card">
          <div className="info__activeLeg__wrapper">
            <form
              className="info__activeLeg__wrapper__form"
              onSubmit={this.onFormSubmit}
            >
              <h3>Which leg would you like to update?</h3>
              <select
                className="selectLeg"
                onChange={e => {
                  const {
                    target: { value },
                  } = e;
                  this.onChangeLeg('legToUpdate', value);
                }}
                value={legToUpdate}
                name="leg"
              >
                {legsData.map(el => this.genereteOptions(el.legID))}
              </select>
              <label className="visuallyhidden" htmlFor="legProgress">
                legProgress
              </label>
              <input
                type="number"
                onChange={e => {
                  const {
                    target: { value },
                  } = e;
                  this.onChangeLeg('legProgress', value);
                }}
                value={legProgress}
                id="legProgress"
                name="legProgress"
                min="0"
                max="100"
                placeholder="Leg % progress"
              />
              <button className="btn-submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
