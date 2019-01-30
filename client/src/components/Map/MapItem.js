import React, { Component } from 'react';
import { Stage, Line, Circle, Layer, Text, Group } from 'react-konva';
import { getDriverPosition } from '../../util/utils';
import { OFF_SET } from '../../constant/mapMult';

export default class MapItem extends Component {
  getDataPoints = () => {
    const { stopsData } = this.props;
    const newData = stopsData.map(el => [el.x * OFF_SET, el.y * OFF_SET]);
    return [].concat(...newData);
  };

  showCompletedLegs = () => {
    const { stopsData, driverLocation } = this.props;

    const data = this.getDataPoints();
    const driverIsHere = getDriverPosition(stopsData, driverLocation);
    const result = data.filter(
      (el, i) =>
        i <
        stopsData.findIndex(e => e.name === driverLocation.activeLegID[0]) * 2 +
          2
    );

    return [...result, ...driverIsHere];
  };

  sortComparator = arr => arr.sort((a, b) => a[0] - b[0]);

  // https://www.chilimath.com/lessons/intermediate-algebra/distance-formula/
  distanceFormula = () => {
    const { bonusDriverLocation, stopsData } = this.props;
    const { x, y } = bonusDriverLocation;
    const calc = stopsData.map(el => {
      const a = el.x - x;
      const b = el.y - y;
      const distance = Number(Math.sqrt(a * a + b * b).toFixed(2));
      return [distance, el.name];
    });
    return calc;
  };

  findClosestStop = () => {
    const { stopsData, bonusDriverLocation } = this.props;
    const nearByStop = this.sortComparator(this.distanceFormula());
    const newData = stopsData.find(el => el.name === nearByStop[0][1]);
    return [
      newData.x * OFF_SET,
      newData.y * OFF_SET,
      bonusDriverLocation.x * OFF_SET,
      bonusDriverLocation.y * OFF_SET,
    ];
  };

  render() {
    const { stopsData, driverLocation, bonusDriverLocation } = this.props;
    if (driverLocation.activeLegID === '' || stopsData.length === 0) {
      return <h4>Loading Drivers Data...</h4>;
    }

    return (
      <section className="map">
        <Stage width={1000} height={1000} className="containerId">
          <Layer>
            <Line points={this.getDataPoints()} stroke="red" />
          </Layer>
          <Layer>
            <Line points={this.showCompletedLegs()} stroke="green" />
          </Layer>
          <Layer>
            {stopsData.map((el, index) => (
              <Circle
                key={index}
                x={el.x * OFF_SET}
                y={el.y * OFF_SET}
                fill="purple"
                radius={4}
                strokeWidth={5}
              />
            ))}
          </Layer>
          <Layer>
            {stopsData.map((el, index) => (
              <Text
                key={index}
                x={el.x * OFF_SET}
                y={el.y * OFF_SET}
                text={el.name}
                fontSize={20}
                fill="MediumSlateBlue"
              />
            ))}
          </Layer>
          <Layer>
            <Group>
              <Text
                x={getDriverPosition(stopsData, driverLocation)[0] + 10}
                y={getDriverPosition(stopsData, driverLocation)[1]}
                text="Driver"
                fontSize={20}
                fill="black"
              />
              <Circle
                x={getDriverPosition(stopsData, driverLocation)[0]}
                y={getDriverPosition(stopsData, driverLocation)[1]}
                fill="purple"
                radius={7}
                strokeWidth={3}
              />
            </Group>
          </Layer>
          <Layer>
            <Group>
              <Text
                x={bonusDriverLocation.x * OFF_SET}
                y={bonusDriverLocation.y * OFF_SET}
                text="Bonus Driver"
                fontSize={20}
                fill="black"
              />
              <Circle
                x={bonusDriverLocation.x * OFF_SET}
                y={bonusDriverLocation.y * OFF_SET}
                fill="orange"
                radius={7}
                strokeWidth={3}
              />
            </Group>
          </Layer>
          <Layer>
            <Line points={this.findClosestStop()} stroke="MediumTurquoise" />
          </Layer>
        </Stage>
      </section>
    );
  }
}
