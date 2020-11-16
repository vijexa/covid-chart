import React from 'react'
import styled from 'styled-components'
import AlignedContainer from './AlignedContainer'

const StyledButton = styled.button`
  --button-color: #5353ff;

  font-size: 1em;
  background: transparent;
  border-radius: 3px;
  border: 2px solid var(--button-color);
  color: var(--button-color);
  margin-top: 1em;
  padding: 0.75em;
`

const StyledError = styled.span`
  color: #ff0000;
  padding: 0.25em;
`

export default function ErrorMessage(
  props: {
    height: number
    children: string
    onRetry: () => void
  }
) {
  return (
    <AlignedContainer height={props.height}>
      Data fetching resolved into this error:
      <StyledError>
        {props.children}
      </StyledError>
      <StyledButton onClick={props.onRetry}>
        Try again
      </StyledButton>
    </AlignedContainer>
  )
}