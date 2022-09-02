module.exports = {
  babel: {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-proposal-private-property-in-object",
    ],
  },
  webpack: {
    configure: {
      output: {
        path: require("path").resolve(__dirname, "build"),
      },
    },
  },
};
