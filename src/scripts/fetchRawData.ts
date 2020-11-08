import * as E from 'fp-ts/Either'

import {RawDataType} from '../types/RawDataType'

const url = 'https://opendata.ecdc.europa.eu/covid19/nationalcasedeath/json/'
const CORSproxy = 'https://cors-anywhere.herokuapp.com/'
const CORSedUrl = CORSproxy + url

type JsonError = {
  error: string
}

export default async function fetchRawData (url?: string): Promise<E.Either<JsonError, RawDataType>> {
  return fetch(url ?? CORSedUrl)
    .then(
      async response => response.ok
        ? response.body 
          ? await response.json()
            .then(
              json => json 
                ? E.right(json as RawDataType)
                : E.left({error: 'json is empty'})
            )
            .catch(
              reason =>
                E.left({error: 'json cannot be parsed, reason: ' + reason})
            ) 
          : E.left({error: 'body is empty'})
        : E.left({
          error: `http response was not ok, it was: ${response.status} ${response.statusText}`
        })
    )
    .catch(
      reason => E.left({error: `network problem: ${reason}`})
    )
}