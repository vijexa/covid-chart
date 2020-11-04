import { Option, some, none } from 'fp-ts/Option'

type DeathsIndicator = "deaths"
type CasesIndicator = "confirmed cases"

export type Indicator = DeathsIndicator | CasesIndicator

export function parseIndicator (str: string): Option<Indicator> {
  switch(str) {
    case "deaths":
      return some(str)
    case "confirmed cases":
      return some(str)
    default: 
      return none
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