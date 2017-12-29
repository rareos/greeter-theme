var path = require("path");
var webpack = require("webpack");

module.exports = function(env) {
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve("./build"),
      filename: "main.js"
    },
    module: {
      loaders: [
        {
          test: /.js?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            presets: ["env", "react", "minify"]
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".min.js"],
      modules: ["./node_modules", "./src"]
    }
  };
};
