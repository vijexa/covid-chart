import React from 'react'
import {LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer} from 'recharts'

import AngledTick from './AngledTick'
import {DataType, Indicator} from '../types/DataType'
import {getCountryData, getIndicatorData, sortDataByDate} from '../scripts/processData'

type CovidChartProps = {
  data: DataType
  countries: string[]
  indicators: Indicator[]
  height: number
}

type ChartRecord = {
  date: string
  parameterName: string
  [key: string]: any
}

export default class CovidChart extends React.Component <CovidChartProps> {
  
  // making cringe format data to satisfy rechart
  formatData = (props: CovidChartProps): ChartRecord[] => {
    // TODO: optimise
    const countriesData = props.countries.flatMap(
      country =>
        getCountryData(country, props.data)
    )

    const indicatorData = props.indicators.flatMap(
      indicator => 
        getIndicatorData(indicator, countriesData)
    )

    // data that is sorted by date and has a property with dynamic name
    // e.g. 'Afghanistandeathsrate14day'
    const sortedNamedData: ChartRecord[] = sortDataByDate(indicatorData).map(
      r => {
        const parName = r.country + r.indicator + 'rate14day'
        return {
          date: r.date.getDate() + "." + (r.date.getMonth() + 1), 
          parameterName: parName,
          [parName]: r.rate14day
        }
      }
    )

    // data that is formatted in a chart-friendly format where dynamic properties
    // from sortedNameData are grouped by date
    const formattedData: ChartRecord[] = sortedNamedData.reduce(
      (acc, curr, i, arr) => {
        if (arr[i - 1]?.date === curr.date) {
          acc[acc.length - 1][curr.parameterName] = curr[curr.parameterName]
          return acc
        } else {
          return [...acc, curr]
        }
      },
      [] as ChartRecord[]
    )

    console.log("datasets:", props.countries, ", ", props.indicators, ": ", formattedData)

    return formattedData
  }

  render() {
    const props = this.props
    
    const formattedData = this.formatData(props)
    const objectData = Object.fromEntries(Object.entries(formattedData))

    console.log("props: ", props, ", formatted data: ", formattedData)
    console.log("objectData", objectData)

    return (
      <div>
        Chart for {props.indicators.join(' and ')} in {props.countries.join(', ')}, 14 day cumulative
        <ResponsiveContainer width="100%" height={props.height}>
          <LineChart style={{fontSize: 20}} data={formattedData}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" interval={30} dx={10} height={40} tick={<AngledTick angle={-35} />} />
            <YAxis />

            {
              props.countries.flatMap(
                country => props.indicators.map(
                  indicator => 
                    <Line key={country + indicator} type="monotone" dataKey={country + indicator + 'rate14day'} stroke="#8884d8" dot={false} strokeWidth={3} />
                )
              )
            }
            
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}