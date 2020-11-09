import * as React from 'react'

import { DataType, Indicator } from '../types/DataType';
import CovidChart from './CovidChart';
import LoadingSpinner from './LoadingSpinner';
import NoDataMessage from './NoDataMessage';

type ChartOrLoadingOrMessageProps = {
  data?: DataType
  country?: string
  indicator: Indicator
  height: number
  loading: boolean
}

export default class ChartOrLoadingOrMessage extends React.Component<ChartOrLoadingOrMessageProps> {

  render() { 
    const props = this.props
    return (
      props.loading
        ? <LoadingSpinner height={props.height} />
        : (props.data && props.country && props.indicator)
          ? <CovidChart height={props.height} data={props.data} country={props.country} indicator={props.indicator} />
          : <NoDataMessage height={props.height} country={props.country} indicator={props.indicator} />
    )
  }
}