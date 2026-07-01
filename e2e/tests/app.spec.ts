import { TMDB_API_BASE_URL } from '@/lib/constants'
import {
  expect,
  http,
  HttpResponse,
  test,
} from 'next/experimental/testmode/playwright/msw'
import { fetchNewAuthenticationToken } from '../fixtures/auth'

test.use({
  mswHandlers: [
    http.get(TMDB_API_BASE_URL.concat('/3/authentication/token/new'), () =>
      HttpResponse.json(fetchNewAuthenticationToken)
    ),
  ],
})

test('should navigate to the home page & fetch a stubbed endpoint', async ({
  page,
}) => {
  await page.goto('/')
  await page.click('text=Fetch')
  await expect(page.locator('h1')).toContainText('abc12')
})
