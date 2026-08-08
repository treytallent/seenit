'use client'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { boundary: 'root' },
    })
  }, [error])

  return (
    <>
      <Container className="my-auto -mt-12 flex h-screen max-h-192 max-w-xl flex-col items-center justify-center">
        <Text>Error</Text>
        <Heading>It&apos;s not you, it&apos;s us</Heading>
        <Text className="mt-6 text-center sm:mt-3">
          Something went wrong on our end.
        </Text>
        <Button
          onClick={() => reset()}
          className="mt-10 sm:mt-8"
          color="purple"
        >
          Try again
        </Button>
      </Container>
    </>
  )
}
