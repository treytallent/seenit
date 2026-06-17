import type { EndpointSuccessResponse } from '@/lib/types/api'

export const fetchNewAuthenticationToken: EndpointSuccessResponse<
  'GET',
  '/3/authentication/token/new'
> = {
  success: true,
  request_token: 'abc123',
}

export const fetchNewSessionId: EndpointSuccessResponse<
  'POST',
  '/3/authentication/session/new'
> = {
  success: true,
  session_id: 'foobar',
}
