import { ApiReturn } from '@/api/types'
import { toast } from 'sonner'

/**
 * Resolves the provided promise and optionally displays a success or error toast.
 */
export async function withToast<T>(
  promise: Promise<ApiReturn<T>>,
  options?: { success?: boolean; error?: boolean }
) {
  const { success, error } = {
    ...{
      success: true,
      error: true,
    },
    ...options,
  }

  const res = await promise

  if (success && res.success && 'string' === typeof res.data) {
    toast.success(res.data)
  } else if (error && !res.success) {
    toast.error(res.error.message)
  }

  return res
}
