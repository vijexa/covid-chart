import React from 'react'
import { Indicator } from '../types/DataType';

import AlignedContainer from './AlignedContainer'

type NoDataMessageProps = {
  height: number
  countries?: string[]
  indicators?: Indicator[]
}
 
export default class NoDataMessage extends React.Component<NoDataMessageProps> {
  render() { 
    const props = this.props
    return (
      <AlignedContainer height={props.height}>
        {
          (props.countries && props.countries.length !== 0 && props.indicators && props.indicators.length !== 0)
            ? `No data to show for ${props.indicators.join(', ')} in ${props.countries.join(', ')}`
            : 'No data to show'

        }
      </AlignedContainer>
    );
  }
}