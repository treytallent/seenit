describe('Session Auth', () => {
  const authRouteHandler = `${Cypress.env('appBaseUrl')}/api/auth`

  it('Should redirect to TMDB for authentication approval', () => {
    cy.visit('/')

    cy.get('[data-testid=submit-auth-redirect]').click()

    cy.url().should(
      'eq',
      `${Cypress.env('tmdbBaseUrl')}/authenticate/abc123?redirect_to=` +
        encodeURIComponent(authRouteHandler)
    )
  })
})
