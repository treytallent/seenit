/**
 * @see https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
 */

const path = require('path') // eslint-disable-line @typescript-eslint/no-require-imports

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
