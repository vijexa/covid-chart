export type RawRecordType = {
  country?: string,
  country_code?: string,
  continent?: string,
  population?: number,
  indicator?: string,
  daily_count?: number,
  date?: string,
  rate_14_day?: string,
  source?: string,
}

export type RawDataType = RawRecordType[]