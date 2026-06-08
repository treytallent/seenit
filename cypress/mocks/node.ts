import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

// todo: i should use this in both unit tests too. so where should the folder go?
