const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: './src/index.js',//入口js
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader', 
            'sass-loader',
          ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
      {
        test: /\.pug$/,
        use: ['html-loader','pug-html-loader']
    }
    ],
  },
  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src'),
    ],
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'webpack',
        excludeChunks:['anotherPage'],
        hash: true,
      template: 'src/index.pug', // 配置文件模板
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
}