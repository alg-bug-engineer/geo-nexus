// postcss.config.mjs

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // The key is now '@tailwindcss/postcss', not 'tailwindcss'
    '@tailwindcss/postcss': {},
  },
};

export default config;