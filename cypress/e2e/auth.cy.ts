describe('Session Auth', () => {
  const authRouteHandler = `${Cypress.env('appBaseUrl')}/api/auth`

  it('redirects to TMDB for authentication approval', () => {
    cy.visit('/')

    cy.get('[data-testid=submit-auth-redirect]').click()

    cy.url().should(
      'eq',
      `${Cypress.env('tmdbBaseUrl')}/authenticate/stubbed-auth-token?redirect_to=` +
        encodeURIComponent(authRouteHandler)
    )
  })

  it('fails to authenticate the user and redirects to the home page', () => {
    cy.visit('/')

    cy.visit(`${authRouteHandler}?request_token=foobar&denied=true`)

    cy.getCookie('sessionId').should('not.exist')

    cy.url().should('eq', `${Cypress.env('appBaseUrl')}/`)
  })

  it('fails to authenticate the user and redirects to their previousPathname cookie', () => {
    cy.visit('/')

    cy.setCookie('previousPathname', 'foo')

    cy.visit(`${authRouteHandler}?request_token=foobar&denied=true`)

    cy.getCookie('sessionId').should('not.exist')

    cy.url().should('eq', `${Cypress.env('appBaseUrl')}/foo`)
  })

  it('authenticates the user and redirects to their previousPathname cookie', () => {
    cy.visit('/')

    cy.setCookie('previousPathname', 'foo')

    cy.visit(`${authRouteHandler}?request_token=foobar&approved=true`)

    cy.getCookie('sessionId').should(
      'have.property',
      'value',
      'stubbed-session-id'
    )

    cy.url().should('eq', `${Cypress.env('appBaseUrl')}/foo`)
  })
})
