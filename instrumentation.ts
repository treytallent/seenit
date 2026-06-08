export async function register() {
  if (
    process.env.MSW_ENABLED === 'true' &&
    process.env.NEXT_RUNTIME === 'nodejs'
  ) {
    const { server } = await import('./cypress/mocks/node')
    server.listen()
  }
}
