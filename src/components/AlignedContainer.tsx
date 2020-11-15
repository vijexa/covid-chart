import styled from 'styled-components'

type AlignedContainerProps = {
  height: number
}

export default styled.div<AlignedContainerProps>`
  width: fit-content;
  height: ${props => props.height}px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`