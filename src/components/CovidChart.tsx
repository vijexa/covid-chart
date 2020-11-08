import React from 'react'
import {LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer} from 'recharts'

import AngledTick from './AngledTick'
import {DataType, Indicator} from '../types/DataType'
import {getCountryData, getIndicatorData, sortDataByDate} from '../scripts/processData'

type CovidChartProps = {
  data: DataType
  country: string
  indicator: Indicator
  height: number
}

type ChartRecord = {
  date: string;
  rate14day: number;
}

export default class CovidChart extends React.Component <CovidChartProps> {
  
  formatDataOrUndefined = (props: CovidChartProps) => {
    if (props.data && props.country && props.indicator) {
      const dataForCountry = getCountryData(props.country, props.data)
      const dataForIndicator = getIndicatorData(props.indicator, dataForCountry) 
      console.log(props.country + ", " + props.indicator + ": ", dataForIndicator)
      const sortedData = sortDataByDate(dataForIndicator)
      const formattedData: ChartRecord[] = sortedData.map(
        r => ({
          date: r.date.getDate() + "." + (r.date.getMonth() + 1), 
          rate14day: r.rate14day
        })
      )

      return formattedData
    } else {
      return undefined
    }
  }

  render() {
    const props = this.props
    
    const formattedData = this.formatDataOrUndefined(props)

    console.log("props: ", props, ", formatted data: ", formattedData)

    return (
      <div>
        Chart for {props.indicator} in {props.country}, 14 day cumulative
        <ResponsiveContainer width="100%" height={props.height}>
          <LineChart style={{fontSize: 20}} data={formattedData}>
            <Line type="monotone" dataKey="rate14day" stroke="#8884d8" dot={false} strokeWidth={3} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" interval={30} dx={10} height={40} tick={<AngledTick angle={-35} />} />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}