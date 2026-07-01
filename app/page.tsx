'use client'

import { Button } from '@/src/components/ui/button'
import { tmdbClient } from '@/src/lib/api/tmdb-client'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('Heading')
  return (
    <div className="">
      <h1>{text}</h1>
      <Button
        onClick={async () => {
          const fetchRes = await tmdbClient(
            'GET',
            '/3/authentication/token/new'
          )
          if (fetchRes.success) {
            setText(fetchRes.data.request_token ?? '')
          }
        }}
      >
        Fetch
      </Button>
    </div>
  )
}
