import Home from '@/app/page'
import { render, screen } from '@testing-library/react'
import { describe, expect } from 'vitest'

describe('Smoke test', () => {
  render(<Home />)

  const heading = screen.getByRole('heading', { level: 1 })

  expect(heading).toBeDefined()
})
