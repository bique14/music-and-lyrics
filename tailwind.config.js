module.exports = {
  // purge: ["./src/entry-points/*.html", "./src/entry-points/**/*.html"],
  purge: [],
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
