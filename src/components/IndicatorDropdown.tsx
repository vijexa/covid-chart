import { StateT } from 'fp-ts/lib/StateT'
import * as React from 'react'

import {Indicator} from '../types/DataType'

type IndicatorDropdownProps = {
  className?: string
  onChange: (indicator: Indicator) => void
}
 
export default class IndicatorDropdown extends React.Component<IndicatorDropdownProps> {
  constructor(props: IndicatorDropdownProps) {
    super(props)
  }

  render() { 
    const props = this.props
    return (
      <select className={props.className} onChange={(event) => props.onChange(event.target.value as Indicator)} >
        <option>confirmed cases</option>
        <option>deaths</option>
      </select>
    )
  }
}