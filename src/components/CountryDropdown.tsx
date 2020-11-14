import * as React from 'react'
import MultiSelect from "react-multi-select-component"

export type OptionType = {
  value: string
  label: string
}

interface CountryDropdownProps  {
  className?: string
  values: string[]
  options: OptionType[]

  onChange: (country: string[]) => void
}
 
export default class CountryDropdown extends React.Component<CountryDropdownProps> {


  render() { 
    const props = this.props

    return (
      <MultiSelect 
        className={props.className} 
        value={props.options.filter(option => props.values.includes(option.value))} 
        options={props.options} 
        onChange={(selected: OptionType[]) => props.onChange(selected.map(v => v.value))} 
        labelledBy="Select country"
        hasSelectAll={false}
      />
    )
  }
}
 