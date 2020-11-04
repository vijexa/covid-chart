import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/lib/function'
import { Do } from 'fp-ts-contrib/Do'

import {RawRecordType, RawDataType} from "../types/RawDataType"
import {RecordType, DataType, parseIndicator} from "../types/DataType"

function parseDateOpt (str: string): O.Option<Date> {
  const date = new Date(str)
  switch(date.toString()) {
    case "Invalid Date":
      return O.none
    default:
      return O.some(date)
  }
}

function parseFloatOpt (str: string): O.Option<number> {
  const float = parseFloat(str)
  return float ? O.some(float) : O.none
}

function processRecord (record: RawRecordType): O.Option<RecordType> {
  return Do(O.option)
    .bindL('country',     () => record.country ? O.some(record.country) : O.none)
    .bindL('indicator',   () => parseIndicator(record.indicator))
    .bindL('dailyCount',  () => O.some(record.daily_count))
    .bindL('date',        () => parseDateOpt(record.date))
    .bindL('rate14day',   () => parseFloatOpt(record.rate_14_day))
    .bindL('source',      () => record.source ? O.some(record.source) : O.none)
    .return((record) => record)
}

export default function processData(rawData: RawDataType): DataType {
  const processed = 
    A.compact(
      pipe(
        rawData,
        A.map(processRecord)
      )
    )
    
  return processed
}

/* 
export default function (rawData: RawDataType): DataType {
  const processed: DataType = 
    rawData.flatMap(
      (record) => ({
        country: record.country,
        indicator: parseIndicator(record.indicator),
        dailyCount: record.daily_count,
        date: new Date(record.date),
        rate14day: parseFloat(record.rate_14_day),
        source: record.source  
      })
    )
  return processed
} */
