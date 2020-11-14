import * as React from 'react'

import { DataType, Indicator } from '../types/DataType';
import CovidChart from './CovidChart';
import LoadingSpinner from './LoadingSpinner';
import NoDataMessage from './NoDataMessage';

type ChartOrLoadingOrMessageProps = {
  data?: DataType
  countries?: string[]
  indicators: Indicator[]
  height: number
  loading: boolean
}

export default class ChartOrLoadingOrMessage extends React.Component<ChartOrLoadingOrMessageProps> {

  render() { 
    const props = this.props
    return (
      props.loading
        ? <LoadingSpinner height={props.height} />
        : (
          props.data 
          && props.countries 
          && props.countries?.length !== 0 
          && props.indicators 
          && props.indicators?.length !== 0
        )
          ? <CovidChart height={props.height} data={props.data} countries={props.countries} indicators={props.indicators} />
          : <NoDataMessage height={props.height} countries={props.countries} indicators={props.indicators} />
    )
  }
}