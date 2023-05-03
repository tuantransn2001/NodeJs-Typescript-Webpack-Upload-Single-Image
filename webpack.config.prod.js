const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  mode: "production",
  watch: true,
  entry: ["./src/app.ts"],
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build/production"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: [nodeExternals()],
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
