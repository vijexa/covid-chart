import * as React from 'react'

import MultiSelectDropdown from './MultiSelectDropdown'

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
      <MultiSelectDropdown 
        className={props.className}
        title="🌍 Countries"
        values={props.values}
        options={props.options}
        onChange={props.onChange}
      />
    )
  }
}
 