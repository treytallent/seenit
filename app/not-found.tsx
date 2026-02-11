import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Container className="my-auto -mt-12 flex h-screen max-h-192 max-w-xl flex-col items-center justify-center">
        <Text>404</Text>
        <Heading>Page not found</Heading>
        <Text className="mt-6 text-center sm:mt-3">
          Sorry, we couldn’t find the page you’re looking for.
        </Text>
        <Button className="mt-10 sm:mt-8" color="purple" href="/">
          <ArrowLeft /> Back to home
        </Button>
      </Container>
    </>
  )
}
