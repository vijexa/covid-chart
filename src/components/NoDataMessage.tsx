import React from 'react'
import { Indicator } from '../types/DataType';

import AlignedContainer from './AlignedContainer'

type NoDataMessageProps = {
  height: number
  country?: string
  indicator?: Indicator
}
 
export default class NoDataMessage extends React.Component<NoDataMessageProps> {
  render() { 
    const props = this.props
    return (
      <AlignedContainer height={props.height}>
        {
          (props.country && props.indicator)
            ? `No data to show for ${props.indicator} in ${props.country}`
            : 'No data to show'

        }
      </AlignedContainer>
    );
  }
}