import React, { Component } from 'react';
import { generateRandomId } from '../../util/utils';

export default class Controls extends Component {
  state = {
    legToUpdate: '',
    legProgress: null,
    x: null,
    y: null,
  };

  componentDidUpdate() {
    const { legsData } = this.props;
    const { legToUpdate } = this.state;
    // select first value as default
    if (legToUpdate === '' && legsData && legsData[0] && legsData[0].legID) {
      this.onChangeLeg('legToUpdate', legsData[0].legID);
    }
  }

  generateOptions = name => (
    <option name={name} key={generateRandomId()} value={name}>
      {name}
    </option>
  );

  onChangeLeg = (key, value) => {
    this.setState({ [key]: value });
  };

  onFormSubmit = (e, paramOne, paramTwo, cl) => {
    e.preventDefault();
    if (paramOne !== '' && paramTwo !== null) {
      cl(paramOne, paramTwo);
      return false;
    }
  };

  render() {
    const { legsData, updateDriverLocation, updateBonusDriver } = this.props;
    const { legToUpdate, legProgress, x, y } = this.state;

    return (
      <div className="info">
        <h2>Update</h2>
        <div className="info__activeLeg">
          <div className="info__activeLeg__wrapper">
            <form
              className="info__activeLeg__wrapper__form"
              onSubmit={e =>
                this.onFormSubmit(
                  e,
                  legToUpdate,
                  legProgress,
                  updateDriverLocation
                )
              }
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
                {legsData.map(el => this.generateOptions(el.legID))}
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
                value={legProgress || ''}
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
          <div className="info__activeLeg__wrapper">
            <form
              className="info__activeLeg__wrapper__form"
              onSubmit={e => this.onFormSubmit(e, x, y, updateBonusDriver)}
            >
              <h3>Coordinates of the bonus driver</h3>
              <label className="visuallyhidden" htmlFor="CoordinatesX">
                legProgress
              </label>
              <input
                type="number"
                onChange={e => {
                  const {
                    target: { value },
                  } = e;
                  this.onChangeLeg('x', value);
                }}
                value={x || ''}
                id="CoordinatesX"
                name="CoordinatesX"
                min="0"
                max="200"
                placeholder="X Coordinates"
              />
              <label className="visuallyhidden" htmlFor="CoordinatesY">
                legProgress
              </label>
              <input
                type="number"
                onChange={e => {
                  const {
                    target: { value },
                  } = e;
                  this.onChangeLeg('y', value);
                }}
                value={y || ''}
                id="CoordinatesY"
                name="CoordinatesY"
                min="0"
                max="200"
                placeholder="Y Coordinates"
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
