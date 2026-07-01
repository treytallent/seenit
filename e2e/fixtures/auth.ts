import type { EndpointSuccessResponse } from '@/lib/types/api'

export const fetchNewAuthenticationToken: EndpointSuccessResponse<
  'GET',
  '/3/authentication/token/new'
> = {
  success: true,
  request_token: 'abc123',
}
