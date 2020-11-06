import React from 'react';
import './App.css';
import Chart from './components/CovidChart'
import * as E from 'fp-ts/Either'
import {pipe} from 'fp-ts/function'

import {data} from "./testData"
import {processData} from './scripts/processData'
import fetchRawData from './scripts/fetchRawData'

(async () => {
  const rawData = await fetchRawData()
  console.log('rawData: ', rawData)
  pipe(
    rawData,
    E.fold(
      error   => console.log('error: ', error.error),
      rawData => console.log('processedData: ', processData(rawData))
    )
  )
})()

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
