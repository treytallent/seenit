import type { EndpointSuccessResponse } from '@/api/types'

export const fetchNewAuthenticationToken: EndpointSuccessResponse<
  'GET',
  '/3/authentication/token/new'
> = {
  success: true,
  request_token: 'stubbed-auth-token',
}

export const fetchNewSessionId: EndpointSuccessResponse<
  'POST',
  '/3/authentication/session/new'
> = {
  success: true,
  session_id: 'stubbed-session-id',
}
