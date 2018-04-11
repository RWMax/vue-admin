var path = require("path")
var webpack = require("webpack")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    common: [
    'vue/dist/vue.esm.js', 
    'vue-router', 
    'vuex', 
    'axios', 
    'babel-polyfill', 
    'fastclick'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library' 
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({ 
      compress:{
        warnings: false,
        drop_console: false
      }
    })
  ]
};