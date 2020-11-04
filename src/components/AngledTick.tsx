import React from 'react'

export default class AngledTick extends React.PureComponent<any> {
    render() {
      const {
        x, y, payload,
      } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform={`rotate(${this.props.angle})`}>{payload.value}</text>
        </g>
      );
    }
  }