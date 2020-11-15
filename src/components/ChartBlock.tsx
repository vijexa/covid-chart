import * as React from 'react'
import * as E from 'fp-ts/Either'
import {pipe} from 'fp-ts/function'
import styled, { css } from 'styled-components'

import {getSortedCountryList, processData} from '../scripts/processData'
import fetchRawData from '../scripts/fetchRawData'
import {DataType, Indicator} from '../types/DataType'
import IndicatorDropdown from './IndicatorDropdown'
import CountryDropdown, {OptionType as CountryOptionType} from './CountryDropdown'
import ChartOrLoadingOrMessage from './ChartOrLoadingOrMessage'

const DropdownStyles = css`
  padding: 0.25em;
  padding-left: 0.75em;
  font-size: 1em;
  width: 20em;
  max-width: 95%;
`

const StyledCountryDropdown = styled(CountryDropdown)`
  ${DropdownStyles}
`

const StyledIndicatorDropdown = styled(IndicatorDropdown)`
  ${DropdownStyles}
`

type ChartBlockProps = {
  chartHeight: number
}
 
type ChartBlockState = {
  data?: DataType
  countries?: string[]
  indicators: Indicator[]

  countryOptions: CountryOptionType[]

  loading: boolean
}
 
export default class ChartBlock extends React.Component<ChartBlockProps, ChartBlockState> {
  changeData = (data?: DataType, countries?: string[], indicators?: Indicator[]) => 
    this.setState({
      data: data ?? this.state.data, 
      countries: countries ?? this.state.countries, 
      indicators: indicators ?? this.state.indicators, 
      countryOptions: this.state.countryOptions 
        ? getSortedCountryList(data ?? [])
          .map(
            country => ({
              value: country,
              label: country
            })
          )
        : [],
      loading: false
    })

  constructor(props: ChartBlockProps) {
    super(props)
    this.state = {loading: false, indicators: [], countryOptions: []}
  }

  componentDidMount() {
    // fetching data from server
    (async () => {
      this.setState({loading: true})
      const rawData = await fetchRawData()
      console.log('rawData: ', rawData)
      pipe(
        rawData,
        E.fold(
          error   => console.log('error: ', error.error),
          rawData => this.changeData(processData(rawData))
        )
      )
    })()
  }

  render() { 
    const state = this.state
    const props = this.props

    console.log(getSortedCountryList(state.data ?? []), state.countries, state.countryOptions)

    return ( 
      <div>

        <StyledCountryDropdown 
          values={state.countries ?? []}
          options={state.countryOptions}
          onChange={
            (countries: string[]) =>
              this.changeData(state.data, countries, state.indicators)
          }
        />

        <StyledIndicatorDropdown 
          values={state.indicators} 
          onChange={ 
            (indicators: Indicator[]) => 
              this.changeData(state.data, state.countries, indicators) 
          } 
        />

        <ChartOrLoadingOrMessage 
          height={props.chartHeight} 
          loading={state.loading} 
          data={state.data} 
          countries={state.countries} 
          indicators={state.indicators} 
        />
      </div>
      
    )
  }
}