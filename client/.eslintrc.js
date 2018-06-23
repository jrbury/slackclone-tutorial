module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  plugins: ["react", "jsx-a11y", "import"],
  globals: {
    document: true
  },
  rules: {
    "react/jsx-filename-extension": "off"
  }
};
