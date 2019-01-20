import React, { Component } from 'react';
import { Stage, Line, Circle, Layer, Text } from 'react-konva';

export default class Map extends Component {
  getData = () => {
    const { stopsData } = this.props;
    const newData = stopsData.map(el => [el.x * 6, el.y * 6]);
    return [].concat(...newData);
  };

  getStopsInfo = (stopsData, driverLocation) => {
    const { activeLegID, legProgress } = driverLocation;
    const percent = legProgress / 100;
    const result = stopsData.filter(
      el => el.name === activeLegID[0] || el.name === activeLegID[1]
    );
    const myX =
      Math.round((result[0].x - result[1].x) * (1 - percent)) + result[1].x;
    const myY =
      Math.round((result[0].y - result[1].y) * (1 - percent)) + result[1].y;
    return [myX * 6, myY * 6];
  };

  render() {
    const { stopsData, driverLocation } = this.props;

    return (
      <section className="map">
        <Stage width={1000} height={1000} className="containerId">
          <Layer>
            <Text
              x={
                driverLocation.activeLegID === '' || stopsData.length === 0
                  ? null
                  : this.getStopsInfo(stopsData, driverLocation)[0] + 10
              }
              y={
                driverLocation.activeLegID === '' || stopsData.length === 0
                  ? null
                  : this.getStopsInfo(stopsData, driverLocation)[1]
              }
              text="Driver"
              fontSize={20}
              fill="Orange"
            />
            <Circle
              x={
                driverLocation.activeLegID === '' || stopsData.length === 0
                  ? null
                  : this.getStopsInfo(stopsData, driverLocation)[0]
              }
              y={
                driverLocation.activeLegID === '' || stopsData.length === 0
                  ? null
                  : this.getStopsInfo(stopsData, driverLocation)[1]
              }
              fill="purple"
              radius={7}
              strokeWidth={3}
            />
          </Layer>
          <Layer>
            <Line points={this.getData()} stroke="#000" />
          </Layer>
          <Layer>
            {stopsData.map((el, index) => (
              <Circle
                key={index}
                x={el.x * 6}
                y={el.y * 6}
                fill="salmon"
                radius={4}
                strokeWidth={5}
              />
            ))}
          </Layer>
          <Layer>
            {stopsData.map((el, index) => (
              <Text
                key={index}
                x={el.x * 6}
                y={el.y * 6}
                text={el.name}
                fontSize={20}
                fill="MediumSlateBlue"
              />
            ))}
          </Layer>
        </Stage>
      </section>
    );
  }
}
