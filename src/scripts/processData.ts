import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe, identity } from 'fp-ts/lib/function'
import { Do } from 'fp-ts-contrib/Do'

import {RawRecordType, RawDataType} from "../types/RawDataType"
import {RecordType, DataType, parseIndicatorOpt} from "../types/DataType"
import { parseJsonSourceFileConfigFileContent } from 'typescript'

function parseDateOpt (str: string | undefined): O.Option<Date> {
  const date = new Date(str ?? '')
  switch(date.toString()) {
    case "Invalid Date":
      return O.none
    default:
      return O.some(date)
  }
}

function parseFloatOpt (str: string | undefined): O.Option<number> {
  const float = parseFloat(str ?? '')
  return float ? O.some(float) : O.none
}

function processRecord (record: RawRecordType): O.Option<RecordType> {
  return Do(O.option)
    .bindL('country',     () => record.country ? O.some(record.country) : O.none)
    .bindL('indicator',   () => parseIndicatorOpt(record.indicator))
    .bindL('dailyCount',  () => record.daily_count !== undefined ? O.some(record.daily_count) : O.none)
    .bindL('date',        () => parseDateOpt(record.date))
    .bindL('rate14day',   () => parseFloatOpt(record.rate_14_day))
    .bindL('source',      () => record.source ? O.some(record.source) : O.none)
    .return(identity)
}

export function processData(rawData: RawDataType): DataType {

  const processed = 
    A.compact(
      pipe(
        rawData,
        A.map(processRecord)
      )
    )

  return processed
}

export function getCountryData(str: string, data: DataType): DataType {
  return data
    .filter(rec => rec.country == str)
    .sort(
      (r1, r2) => r1.date.getTime() - r2.date.getTime()
    )
}