module.exports = {
  // purge: ["./src/entry-points/*.html", "./src/entry-points/**/*.html"],
  purge: [],
  content: ["./src/*.{html,js,ts,jsx,tsx,elm}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
};
