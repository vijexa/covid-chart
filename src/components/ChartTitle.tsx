import * as React from 'react'
import styled from 'styled-components'

import { Indicator } from '../types/DataType'

type ChartTitleProps = {
  countries: string[]
  indicators: Indicator[]
}

const StyledChartTitle = styled.div`
  padding: 1em;
  text-align: center;
  
  :first-letter {
    text-transform: capitalize;  
  }
`

const HighlightedText = styled.span<{color: string}>`
  font-weight: lighter;
  background-color: ${props => props.color};
`

const indicatorsColor = '#fff1b5'
const countriesColor = '#e4ffbb'

export default class ChartTitle extends React.Component<ChartTitleProps> {

  chainElements (strings: string[], delimiter: string, color: string): React.ReactNode {
    return strings.length !== 0
      ? strings
          .map<React.ReactNode>(ind => <HighlightedText color={color}>{ind}</HighlightedText>)
          .reduce((prev, curr) => [prev, delimiter, curr])
      : undefined
  }

  render() { 
    const props = this.props

    return (
      <StyledChartTitle>
          {
            this.chainElements(props.indicators, ' and ', indicatorsColor)
          } in {
            this.chainElements(props.countries.slice(0, props.countries.length - 1), ', ', countriesColor)
          }{props.countries.length > 1 ? ' and ' : ''} 
          <HighlightedText color={countriesColor}>{props.countries[props.countries.length - 1]}</HighlightedText>, 14 day cumulative
      </StyledChartTitle>
    )
  }
}