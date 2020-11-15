import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

import AlignedContainer from './AlignedContainer'

type LoadingSpinnerProps = {
  height: number
}
 
export default class LoadingSpinner extends React.Component<LoadingSpinnerProps> {
  render() { 
    const props = this.props
    return (
      <AlignedContainer height={props.height}>
        <PulseLoader size='2em' />
        Loading data, please stand by
      </AlignedContainer>
    );
  }
}