import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe, identity } from 'fp-ts/lib/function'
import { Do } from 'fp-ts-contrib/Do'

import {RawRecordType, RawDataType} from "../types/RawDataType"
import {RecordType, DataType, parseIndicatorOpt, Indicator} from "../types/DataType"

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
  return float ? O.some(float) : O.some(0)
}

function processRecord (record: RawRecordType): O.Option<RecordType> {
  return Do(O.option)
    .bindL('country',     () => record.country ? O.some(record.country) : O.none)
    .bindL('indicator',   () => parseIndicatorOpt(record.indicator))
    .bindL('dailyCount',  () => record.daily_count !== undefined ? O.some(record.daily_count) : O.some(0))
    .bindL('date',        () => parseDateOpt(record.date))
    .bindL('rate14day',   () => parseFloatOpt(record.rate_14_day))
    .bindL('source',      () => record.source ? O.some(record.source) : O.some("no source"))
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
  const country = str.toLowerCase()
  return data
    .filter(rec => rec.country.toLowerCase() === country)
}

export function getIndicatorData(indicator: Indicator, data: DataType): DataType {
  return data
    .filter(rec => rec.indicator === indicator)
}

export function sortDataByDate(data: DataType): DataType {
  return data
    .sort(
      (r1, r2) => r1.date.getTime() - r2.date.getTime()
    )
}

export function getSortedCountryList(data: DataType): string[] {
  return data
    .map(record => record.country)
    .sort(
      (c1, c2) => {
        const c1l = c1.toLowerCase(), c2l = c2.toLowerCase()
        if (c1l < c2l) return -1
        if (c1l > c2l) return 1
        return 0
      }
    )
    .reduce(
      (acc, curr) => (
        acc[acc.length - 1] != curr 
          ? [...acc, curr]
          : acc
      ),
      [] as string[]
    )
}