/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'es5',
  tailwindFunctions: ['twMerge', 'twJoin', 'tw'],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindStylesheet: './app/globals.css',
}

export default config
