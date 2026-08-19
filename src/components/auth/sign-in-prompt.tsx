import { NavigationAuthButton } from '@/components/navigation/navigation-auth'
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/icons/loading-spinner'
import { TmdbLogoPrimaryFull } from '@/components/ui/icons/tmdb-logo-primary-full'
import { withToast } from '@/features/toast/with-toast'
import { createNewGuestSession } from '@/lib/auth/guest-session'
import {
  buildAuthRedirectUrl,
  redirectWithPreviousPathname,
} from '@/lib/auth/user-session'
import { specs } from '@/lib/motion'
import { AnimatePresence, motion, resize } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { startTransition, useActionState, useCallback, useState } from 'react'

/**
 * Guest sessions can only rate media.
 * Their documentation claims guest sessions can maintain lists, but this is incorrect.
 * The purpose of this type is for identifying actions to conditionally display valid authentication options.
 *
 * @link https://www.themoviedb.org/talk/65f90f7107e2810163c109a6
 */
type AuthActions = 'rate' | 'save'

type SignInPromptProps = { action: AuthActions }

const copyMap: { [K in AuthActions]: string } = {
  rate: 'Please sign in with a TMDB account or continue as a guest to rate movies and TV shows.',
  save: 'Saving your favourite movies and TV shows requires a TMDB account.',
}

export function SignInPrompt({ action }: SignInPromptProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const pathname = usePathname()

  const [_, newGuestSessionAction, isNewGuestSessionPending] = useActionState(
    () => withToast(createNewGuestSession()),
    null
  )

  const [__, newUserSessionAction, isNewUserSessionPending] = useActionState(
    async () => {
      const res = await withToast(buildAuthRedirectUrl(), { success: false })

      if (res.success) {
        await redirectWithPreviousPathname(res.data, pathname)
      }
    },
    null
  )

  const measureRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return
    setHeight(el.offsetHeight)
    return resize(el, (_, { height }) => setHeight(height))
  }, [])

  return (
    <>
      <NavigationAuthButton
        data-testid="sign-in-dialog"
        onClick={() => setIsOpen(true)}
      />

      <Alert open={isOpen} onClose={setIsOpen}>
        <motion.div
          animate={{ height }}
          style={{ willChange: 'height' }}
          transition={specs.transitions.ui}
          className="overflow-hidden"
        >
          <div ref={measureRef}>
            <AnimatePresence initial={false} mode="popLayout">
              {isNewUserSessionPending ? (
                <motion.div
                  key="user-session-pending"
                  transition={specs.transitions.ui}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0)' }}
                  initial={{
                    y: specs.travel.enter,
                    opacity: 0,
                    filter: 'blur(2px)',
                  }}
                  exit={{
                    y: -specs.travel.enter,
                    opacity: 0,
                    filter: 'blur(2px)',
                  }}
                >
                  <AlertTitle className="sm:text-center">
                    Redirecting to TMDB
                  </AlertTitle>
                  <AlertDescription className="sm:text-center">
                    This will only take a moment...
                  </AlertDescription>
                  <LoadingSpinner className="mt-4 justify-self-center" />
                </motion.div>
              ) : (
                <motion.div
                  key="sign-in-options"
                  transition={specs.transitions.ui}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0)' }}
                  initial={{ y: 0, opacity: 1, filter: 'blur(2px)' }}
                  exit={{
                    y: -specs.travel.enter,
                    opacity: 0,
                    filter: 'blur(2px)',
                  }}
                >
                  <AlertTitle className="sm:text-center">
                    Sign in to continue
                  </AlertTitle>
                  <AlertDescription className="sm:text-center">
                    {copyMap[action]}
                  </AlertDescription>
                  <AlertActions className="sm:flex-col-reverse sm:*:w-full">
                    {'rate' === action && (
                      <Button
                        onClick={() => startTransition(newGuestSessionAction)}
                        plain
                        disabled={isNewGuestSessionPending}
                        className="data-disabled:opacity-100! sm:*:[svg]:my-0.5! sm:*:[svg]:size-5"
                        data-testid="sign-in-guest"
                      >
                        {isNewGuestSessionPending ? (
                          <LoadingSpinner />
                        ) : (
                          'Continue as guest'
                        )}
                      </Button>
                    )}

                    <Button
                      onClick={() => startTransition(newUserSessionAction)}
                      color="purple"
                      className="*:[svg]:-my-2! sm:*:[svg]:size-6"
                      disabled={isNewGuestSessionPending}
                      data-testid="sign-in-tmdb"
                    >
                      <TmdbLogoPrimaryFull />
                      Continue with TMDB
                    </Button>
                  </AlertActions>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Alert>
    </>
  )
}
