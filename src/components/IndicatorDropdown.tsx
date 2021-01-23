import * as React from 'react'

import {Indicator} from '../types/DataType'
import MultiSelectDropdown from './MultiSelectDropdown'

type OptionType = {
  value: Indicator
  label: string
}

type IndicatorDropdownProps = {
  className?: string
  values: Indicator[]

  onChange: (indicator: Indicator[]) => void
}

const options: OptionType[] = [
  { value: 'cases', label: 'Confirmed cases' },
  { value: 'deaths', label: 'Deaths' }
]
 
export default class IndicatorDropdown extends React.Component<IndicatorDropdownProps> {

  render() { 
    const props = this.props

    return (
      <MultiSelectDropdown 
        className={props.className}
        title="💀 Indicators"
        values={props.values}
        options={options}
        onChange={props.onChange as (indicator: string[]) => void}
      />
    )
  }
}