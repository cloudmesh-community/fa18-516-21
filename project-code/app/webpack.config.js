const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = [{
  entry: ['./renderer.js', './app.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty'
  },
  devServer: {
        port: 9000
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          },
        ]
      },
      { 
        test: /\.hbs$/, 
        loader: "handlebars-loader",
        query: {
          helperDirs: __dirname + '/util/helpers'
        }
      }
    ]
  }
}];