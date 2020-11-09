import * as React from 'react'
import * as E from 'fp-ts/Either'
import {pipe} from 'fp-ts/function'
import styled, { css } from 'styled-components'
import { CountryDropdown } from 'react-country-region-selector'

import {processData} from '../scripts/processData'
import fetchRawData from '../scripts/fetchRawData'
import {DataType, Indicator} from '../types/DataType'
import IndicatorDropdown from './IndicatorDropdown'
import ChartOrLoadingOrMessage from './ChartOrLoadingOrMessage'

const DropdownStyles = css`
  padding: 0.5em;
  margin-bottom: 0.5em;
  font-size: 1em;
  width: 100%;
  border-radius: 0.5em;
  appearance: none;
  background-image: url(down-arrow.jpg) no-repeat right;
`

const StyledCountryDropdown = styled(CountryDropdown)`
  ${DropdownStyles}
`

const StyledIndicatorDropdown = styled(IndicatorDropdown)`
  ${DropdownStyles}
`

type ChartBlockProps = {
  height: number
}
 
type ChartBlockState = {
  data?: DataType
  country?: string
  indicator: Indicator

  loading: boolean
}
 
export default class ChartBlock extends React.Component<ChartBlockProps, ChartBlockState> {
  changeData = (data?: DataType, country?: string, indicator?: Indicator) => 
    this.setState({
      data: data, 
      country: country, 
      indicator: indicator ?? this.state.indicator, 
      loading: false
    })

  constructor(props: ChartBlockProps) {
    super(props)
    this.state = {loading: false, indicator: 'confirmed cases'}
  }

  componentDidMount() {
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
    return ( 
      <div>
        <StyledCountryDropdown value={state.country ?? ''} onChange={(country) => this.changeData(state.data, country, state.indicator) }/>
        <StyledIndicatorDropdown onChange={(indicator) => this.changeData(state.data, state.country, indicator)} />
        <ChartOrLoadingOrMessage height={props.height} loading={state.loading} data={state.data} country={state.country} indicator={state.indicator} />
      </div>
      
    )
  }
}