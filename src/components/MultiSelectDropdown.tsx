import * as React from 'react'
import MultiSelect from "react-multi-select-component"
import styled from 'styled-components'

export type OptionType = {
  value: string
  label: string
}

interface MultiSelectDropdownProps  {
  className?: string
  values: string[]
  options: OptionType[]
  title: string

  onChange: (country: string[]) => void
}
 
const StyledTitle = styled.div`
  padding-bottom: 0.5em;
`

const StyledMultiSelect = styled(MultiSelect)`
  --rmsc-radius: 15px;
  --rmsc-p: 0.5em;
  --rmsc-h: 1.75em;
`

export default class MultiSelectDropdown extends React.Component<MultiSelectDropdownProps> {


  render() { 
    const props = this.props

    return (
      <div className={props.className}>
        <StyledTitle>
          {props.title}
        </StyledTitle>
        <StyledMultiSelect 
          value={props.options.filter(option => props.values.includes(option.value))} 
          options={props.options} 
          onChange={(selected: OptionType[]) => props.onChange(selected.map(v => v.value))} 
          labelledBy="Select country"
          hasSelectAll={false}
        />
      </div>
    )
  }
}
 