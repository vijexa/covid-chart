import React from 'react'
import {LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer, Legend} from 'recharts'
import styled from 'styled-components'

import AngledTick from './AngledTick'
import {DataType, Indicator} from '../types/DataType'
import {getCountryData, getIndicatorData, sortDataByDate} from '../scripts/processData'
import generateHexColors from '../scripts/generateColors'
import ChartTitle from './ChartTitle'

const StyledContainer = styled.div`
  width: 100%;
`

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
  
  // making cringe data format to satisfy rechart
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
    const sortedNamedData: ChartRecord[] = sortDataByDate(indicatorData).map(
      r => {
        const parName = this.makeEntryName(r.country, r.indicator)
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
  
  makeEntryName (country: string, indicator: Indicator): string {
    const formatIndicator = (ind: Indicator) => {
      switch (ind) {
        case 'confirmed cases':
          return 'cc'
        case 'deaths':
          return 'd'
      }
    }

    return `${country}, ${formatIndicator(indicator)}`
  }

  render() {
    const props = this.props
    
    const formattedData = this.formatData(props)

    const dataEntries = Object
      .entries(formattedData[0])
      .filter(
        ([entry, _]) => entry !== 'date' && entry !== 'parameterName'
      )

    console.log("props: ", props, ", formatted data: ", formattedData)

    const colors = generateHexColors(dataEntries.length)
    console.log("colors:", colors)

    const dataColors = dataEntries.map(
      ([entry, _], i) => ({
        entry: entry,
        color: colors[i]
      })
    )

    console.log('data colors:', dataColors)

    return (
      <StyledContainer>
        <ChartTitle 
          countries={props.countries} 
          indicators={props.indicators} 
        />

        <ResponsiveContainer width="100%" height={props.height}>
          <LineChart style={{fontSize: 20}} data={formattedData}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" interval={30} dx={10} height={40} tick={<AngledTick angle={-55} />} />
            <YAxis />
            <Legend />

            {
              props.countries.flatMap(
                country => props.indicators.map(
                  indicator => 
                    <Line 
                      key={this.makeEntryName(country, indicator)} 
                      type="monotone" 
                      dataKey={this.makeEntryName(country, indicator)} 
                      stroke={dataColors.find(val => val.entry === this.makeEntryName(country, indicator))?.color ?? '#000000'} 
                      dot={false} 
                      strokeWidth={3} 
                    />
                )
              )
            }
            
          </LineChart>
        </ResponsiveContainer>
      </StyledContainer>
    )
  }
}