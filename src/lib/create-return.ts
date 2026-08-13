import type { ApiReturn } from '@/api/types'
import { TmdbError } from '@/api/types'

/**
 * Utility for creating a normalised API response.
 *
 * @template T The data type.
 * @returns A successful response containing the provided data.
 */
export function createSuccessReturn<T>(data: T): ApiReturn<T> {
  return { success: true, data }
}

/**
 * Utility for creating a normalised API response.
 *
 * @returns An unsuccessful response containing error details.
 */
export function createErrorReturn<E extends Omit<TmdbError, 'success'>>(
  error: E
): ApiReturn<never> {
  return {
    success: false,
    error: {
      code: error.status_code,
      message: error.status_message ?? '',
    },
  }
}

/**
 * Utility for creating a consistent error response.
 *
 * @returns An unsuccessful response containing error details.
 */
export function createMissingPropertyReturn(message: string): ApiReturn<never> {
  return {
    success: false,
    error: {
      code: 500,
      message,
    },
  }
}

/**
 * Utility for creating a normalised API response.
 *
 * @returns An unsuccessful response containing error details.
 */
export function createUnknownErrorReturn(
  message: string = 'An unknown error occured.'
): ApiReturn<never> {
  return {
    success: false,
    error: {
      code: 0,
      message,
    },
  }
}
