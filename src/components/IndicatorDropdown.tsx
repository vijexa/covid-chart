import * as React from 'react'
import MultiSelect from "react-multi-select-component"

import {Indicator} from '../types/DataType'

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
  { value: 'confirmed cases', label: 'Confirmed cases' },
  { value: 'deaths', label: 'Deaths' }
]
 
export default class IndicatorDropdown extends React.Component<IndicatorDropdownProps> {

  render() { 
    const props = this.props

    return (
      <MultiSelect 
        className={props.className} 
        value={options.filter(option => props.values.includes(option.value))} 
        options={options} 
        onChange={(selected: OptionType[]) => props.onChange(selected.map(v => v.value))} 
        labelledBy="Select indicator"
        hasSelectAll={false}
      />
    )
  }
}