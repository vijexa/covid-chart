import * as O from 'fp-ts/Option'

type DeathsIndicator = "deaths"
type CasesIndicator = "cases"

export type Indicator = DeathsIndicator | CasesIndicator

export function parseIndicatorOpt (str: string | undefined): O.Option<Indicator> {
  switch(str) {
    case "deaths":
      return O.some(str)
    case "cases":
      return O.some(str)
    default: 
      return O.none
  }
}

export type RecordType = {
  country: string,
  indicator: Indicator,
  dailyCount: number,
  year_week: string,
  rate14day: number,
  source: string,
}
export type DataType = RecordType[]