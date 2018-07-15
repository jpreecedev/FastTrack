const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const OUTPUT_PATH = path.resolve('./dist')

module.exports = (env, argv) => ({
  devtool: argv.mode === 'development' ? 'source-map' : '',
  devServer: {
    port: 3100,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      components: path.resolve(__dirname, './src/components/')
    }
  },
  output: {
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: './public' }]),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: path.join(OUTPUT_PATH, 'sw.js')
    }),
    new WebpackPwaManifest({
      name: 'Fast Track',
      short_name: 'fasttrack',
      description: 'Track your fasting activity over time',
      background_color: '#c33764',
      theme_color: '#c33764',
      icons: [
        {
          src: path.resolve('./public/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ]
    })
  ]
})
