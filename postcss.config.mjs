// postcss.config.mjs (or postcss.config.js - this one can stay as JS)
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config