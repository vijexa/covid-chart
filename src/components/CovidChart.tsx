import React from 'react'
import {LineChart, XAxis, YAxis, CartesianGrid, Line} from 'recharts'

import AngledTick from './AngledTick'

import {DataType, Indicator} from '../types/DataType'

type CovidChartProps = {
  data: DataType,
  country: string,
  indicator: Indicator
}

export default class CovidChart extends React.Component <CovidChartProps> {
  

  render() {
    const formattedData = this.props.data.map(
      r => ({
        date: this.props.data[0].date.getDate() + "." + (r.date.getMonth() + 1), 
        rate14day: r.rate14day
      })
    )

    return (
      <div>
        this is Chart for {this.props.country}
        <hr></hr>
        <LineChart style={{fontSize: 20}} width={600} height={400} data={formattedData}>
          <Line type="monotone" dataKey="rate14day" stroke="#8884d8" dot={false} strokeWidth={3} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" interval={30} dx={10} height={40} tick={<AngledTick angle={-35} />} />
          <YAxis />
        </LineChart>
      </div>
    )
  }
}