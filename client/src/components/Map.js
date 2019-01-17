import React, { Component } from 'react';
import { Stage, Line, Circle, Layer, Text } from 'react-konva';

export default class Map extends Component {
  getData = () => {
    const { stopsData } = this.props;
    const newData = stopsData.map(el => [el.x * 6, el.y * 6]);
    return [].concat(...newData);
  };

  render() {
    const { stopsData } = this.props;
    return (
      <section className="map">
        <Stage width={1200} height={1200} draggable>
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
