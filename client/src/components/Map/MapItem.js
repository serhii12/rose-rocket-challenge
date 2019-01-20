import React, { Component } from 'react';
import { Stage, Line, Circle, Layer, Text } from 'react-konva';
import { getDriverPosition } from '../../util/utils';

const OFF_SET = 6;
export default class Map extends Component {
  getData = () => {
    const { stopsData } = this.props;
    const newData = stopsData.map(el => [el.x * OFF_SET, el.y * OFF_SET]);
    return [].concat(...newData);
  };

  showCompletedLegs = () => {
    const { stopsData, driverLocation } = this.props;
    const data = this.getData();
    const driverIsHere = getDriverPosition(stopsData, driverLocation);
    const result = data.filter(
      (el, i) =>
        i <
        stopsData.findIndex(e => e.name === driverLocation.activeLegID[0]) * 2 +
          2
    );

    return [...result, ...driverIsHere];
  };

  render() {
    const { stopsData, driverLocation } = this.props;
    if (driverLocation.activeLegID === '' || stopsData.length === 0) {
      return null;
    }
    return (
      <section className="map">
        <Stage width={1000} height={1000} className="containerId">
          <Layer>
            <Line points={this.getData()} stroke="red" />
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
          </Layer>
        </Stage>
      </section>
    );
  }
}
