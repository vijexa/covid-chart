import React from 'react'
import styled from 'styled-components'

import ChartBlock from './components/ChartBlock'

const StyledApp = styled.div`
  text-align: left;
  background-color: #ffffff;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: rgb(39, 39, 39);
  padding: 5%;
`

const StyledHeader = styled.header`
  font-size: 2em;
  margin-bottom: 0.5em;
`

function App() {
  return (
    <StyledApp>
      <StyledHeader>
        Super cool app description
      </StyledHeader>
      <ChartBlock chartHeight={500} />
    </StyledApp>
  );
}

export default App;
