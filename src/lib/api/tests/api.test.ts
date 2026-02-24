import { tryTmdbRequest } from '@/lib/api/api'

describe('tryTmdbRequest', () => {
  describe('successful', () => {
    it('should return data', async () => {
      const mockData = { foo: 'lorem ipsum' }

      const mockResponse = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      })

      const value = await tryTmdbRequest(mockResponse)

      expect(value).toEqual({
        success: true,
        data: mockData,
      })
    })
  })

  describe('unsuccessful', () => {
    it('should return TMDB error', async () => {
      const mockData = {
        success: false,
        status_code: 34,
        status_message: 'The resource you requested could not be found.',
      }

      const mockResponse = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      })

      await expect(tryTmdbRequest(mockResponse)).resolves.toEqual({
        success: false,
        error: mockData,
      })
    })

    it('should return unknown error if response is rejected', async () => {
      const mockData = 'Foo'

      const mockResponse = jest.fn().mockResolvedValue({
        json: jest.fn().mockRejectedValue(mockData),
      })

      await expect(tryTmdbRequest(mockResponse)).resolves.toEqual({
        success: false,
        error: {
          status_code: 0,
          status_message: 'An unknown error occured.',
          unknown_error: mockData,
        },
      })
    })

    it('should return unknown error if response has no json method', async () => {
      const mockRequest = jest.fn().mockResolvedValue({})

      const result = await tryTmdbRequest(mockRequest)

      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.status_code).toBe(0)
        expect(result.error.status_message).toBe('An unknown error occured.')

        expect(result.error).toHaveProperty('unknown_error')
        if ('unknown_error' in result.error) {
          expect(result.error.unknown_error).toBeInstanceOf(TypeError)
        }
      }
    })
  })
})
