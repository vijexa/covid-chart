import React from 'react';
import './App.css';
import Chart from './components/CovidChart'

import {data} from "./testData"
import processData from './scripts/processData'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Fuck
        <br></br>
        sdfdsfsdf
        <br></br>
      </header>
      <Chart data={processData(data)} country="Latvia" indicator="confirmed cases"/>
    </div>
  );
}

export default App;
