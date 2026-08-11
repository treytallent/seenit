import { APP_BASE_URL, TMDB_API_BASE_URL, TMDB_BASE_URL } from '@/lib/constants'
import {
  expect,
  http,
  HttpResponse,
  test as it,
  type Page,
} from 'next/experimental/testmode/playwright/msw'
import {
  fetchNewAuthenticationToken,
  fetchNewSessionId,
} from '../fixtures/auth'

it.use({
  mswHandlers: [
    [
      http.get(TMDB_API_BASE_URL.concat('/3/authentication/token/new'), () =>
        HttpResponse.json(fetchNewAuthenticationToken)
      ),
      http.post(TMDB_API_BASE_URL.concat('/3/authentication/session/new'), () =>
        HttpResponse.json(fetchNewSessionId)
      ),
    ],
    { scope: 'test' },
  ],
})

const authRouteHandler = `${APP_BASE_URL}/api/auth`
const getCookie = async (p: Page, cookieName: string) =>
  (await p.context().cookies()).find((c) => c.name === cookieName)

it('redirects to TMDB for authentication approval', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('sign-in-dialog').click()
  await page.getByTestId('sign-in-tmdb').click()

  await expect(page).toHaveURL(
    `${TMDB_BASE_URL}/authenticate/stubbed-auth-token?redirect_to=` +
      encodeURIComponent(authRouteHandler)
  )
})

it('fails to authenticate the user and redirects to the home page', async ({
  page,
}) => {
  await page.goto(`${authRouteHandler}request_token=foobar&denied=true`)

  expect(await getCookie(page, 'sessionId')).toBeUndefined()

  await expect(page).toHaveURL(`${APP_BASE_URL}/`)
})

it('fails to authenticate the user and redirects to the value of their previousPathname cookie', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .context()
    .addCookies([{ name: 'previousPathname', value: 'foo', url: APP_BASE_URL }])

  await page.goto(`${authRouteHandler}?request_token=foobar&denied=true`)

  expect(await getCookie(page, 'sessionId')).toBeUndefined()
  await expect(page).toHaveURL(`${APP_BASE_URL}/foo`)
})

it('authenticates the user and redirects to value of their previousPathname cookie', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .context()
    .addCookies([{ name: 'previousPathname', value: 'foo', url: APP_BASE_URL }])
  await page.goto(`${authRouteHandler}?request_token=foobar&approved=true`)

  expect(await getCookie(page, 'sessionId')).toHaveProperty(
    'value',
    'stubbed-session-id'
  )

  await expect(page).toHaveURL(`${APP_BASE_URL}/foo`)
})
