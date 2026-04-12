import type { MovieWithMediaType, SeriesWithMediaType } from './media'

interface PersonBase {
  id: number
  name: string
  original_name: string
  profile_path: string | null
  adult: boolean
  known_for_department: string
  gender: number
  popularity: number
}

export interface Person extends PersonBase {
  known_for: (MovieWithMediaType | SeriesWithMediaType)[]
}

export interface PersonWithMediaType extends Person {
  media_type: 'person'
}

export interface Cast extends PersonBase {
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Crew extends PersonBase {
  credit_id: string
  department: string
  job: string
}

export interface Credits {
  cast: Cast[]
  crew: Crew[]
}

export interface AggregateCast extends PersonBase {
  roles: {
    credit_id: string
    character: string
    episode_count: number
  }[]
  total_episode_count: number
  order: number
}

export interface AggregateCrew extends PersonBase {
  jobs: {
    credit_id: string
    job: string
    episode_count: number
  }[]
  department: string
  total_episode_count: number
}

export interface AggregateCredits {
  cast: AggregateCast[]
  crew: AggregateCrew[]
}

export type UnknownCast = Cast | AggregateCast
export type UnknownCrew = Crew | AggregateCrew

export type UnknownCredit = Cast | Crew
export type UnknownAggregateCredit = AggregateCast | AggregateCrew

export type UnknownCreditUnion = UnknownCast | UnknownCrew
export type UnknownCreditArray =
  | Cast[]
  | Crew[]
  | AggregateCast[]
  | AggregateCrew[]

export function isCast(person: UnknownCreditUnion): person is Cast {
  return 'character' in person
}

export function isAggregateCast(
  person: UnknownCreditUnion
): person is AggregateCast {
  return 'roles' in person
}

export function isUnknownCast(
  person: UnknownCreditUnion
): person is UnknownCast {
  return isCast(person) || isAggregateCast(person)
}

export function isUnknownCredit(
  person: UnknownCreditUnion
): person is UnknownCredit {
  return 'character' in person || 'job' in person
}

export function isUnknownAggregateCredit(
  person: UnknownCreditUnion
): person is UnknownAggregateCredit {
  return 'total_episode_count' in person
}
