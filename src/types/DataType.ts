import * as O from 'fp-ts/Option'

type DeathsIndicator = "deaths"
type CasesIndicator = "confirmed cases"

export type Indicator = DeathsIndicator | CasesIndicator

export function parseIndicatorOpt (str: string): O.Option<Indicator> {
  switch(str) {
    case "deaths":
      return O.some(str)
    case "confirmed cases":
      return O.some(str)
    default: 
      return O.none
  }
}

export type RecordType = {
  country: string,
  indicator: Indicator,
  dailyCount: number,
  date: Date,
  rate14day: number,
  source: string,
}
export type DataType = RecordType[]