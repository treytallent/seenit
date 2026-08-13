'use server'

import type { ApiReturn } from '@/src/lib/api/types'
import { cookies } from 'next/headers'

type FlashReturn = ApiReturn<string>

export async function setFlashCookie(flash: FlashReturn) {
  const cookieStore = await cookies()
  cookieStore.set('flash', JSON.stringify(flash), {
    secure: true,
    httpOnly: false,
    path: '/',
  })
}

export async function getFlashCookie() {
  const cookieStore = await cookies()
  const flash = cookieStore.get('flash')?.value
  return flash ? (JSON.parse(flash) as FlashReturn) : null
}

export async function deleteFlashCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('flash')
}
