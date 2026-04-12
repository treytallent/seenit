export type ApiReturn<T, E> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: E
    }

export type TmdbErrorReturn = {
  success: false
  status_code: number
  status_message: string
}

export function isTmdbErrorReturn<T extends object>(
  result: T | TmdbErrorReturn
): result is TmdbErrorReturn {
  return 'success' in result && false === result.success
}
