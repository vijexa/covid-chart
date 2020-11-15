import React from 'react'

type AngledTickProps = {
  x?: number
  y?: number
  payload?: any

  angle: number
  initMargin?: number
}

export default class AngledTick extends React.PureComponent<AngledTickProps> {
    render() {
      const {
        x, y, payload,
      } = this.props;
  
      return (
        <g transform={`translate(${(x ?? 0) + (this.props.initMargin ?? 0)},${y})`}>
          <text 
            x={0} 
            y={0} 
            dy={16} 
            textAnchor="end" 
            fill="#666" 
            transform={`rotate(${this.props.angle})`}
          >
            {payload.value}
          </text>
        </g>
      );
    }
  }