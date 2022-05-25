const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
      mode: 'development',
      entry: {
        'index': './src/main/main.ts'
      },
      target: 'electron-main',
      module: {
        rules: [{
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }]
        }]
      },
      output: {
        path: __dirname + '/dist',
        filename: 'main.js'
      }
    },
    {
        mode: 'development',
        entry: './src/renderer/react.tsx',
        target: 'electron-renderer',
        devtool: 'source-map',
        module: { rules: [{
            test: /\.ts(x?)$/,
            include: /src/,
            use: [{ loader: 'ts-loader' }]
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }
        ]},
        output: {
          path: __dirname +   '/dist',
          filename: 'react.js'
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './src/renderer/index.html'
          })
        ],
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
          modules: ['src', 'node_modules'] // Assuming that your files are inside the src dir
        }
      },
      
];