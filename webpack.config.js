const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('dotenv').config()
const babelConfig = require("./babel.config.json")
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
const webpack = require('webpack')

module.exports = (env = {}) => {
  let entry = [
    './src/index.ts',
    './src/style.scss'
  ];
  if(env.mock) {
    entry.unshift('./src/mock/mock.ts');
  }
  if(env.split_search) {
    entry.push('./src/modules/home/HomeModule.ts');
  }
  if(env.flag_new_results) {
    entry.push('./src/modules/become-a-mentor/BecomeAMentorModule.ts');
  }
  if(env.flag_new_results) {
    entry.push('./src/modules/find-a-mentor/FindAMentorModule.ts');
  }

  const api_url = env.api_url ?? 'http://localhost:8081';

  return {
    entry: entry,
    mode: "development",
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.scss'],
      alias: {
        vue: 'vue/dist/vue.js',
        BaseMixin: path.resolve(__dirname, 'src/mixins/BaseMixin'),
        Models: path.resolve(__dirname, 'src/models'),
        Interfaces: path.resolve(__dirname, 'src/interfaces'),
        components: path.resolve(__dirname, 'src/contrib/vue-material/src/components'),
        theme: path.resolve(__dirname, 'src/contrib/vue-material/src/theme'),
        "vue-material": path.resolve(__dirname, 'src/contrib/vue-material/src'),
        node_modules: path.resolve(__dirname, 'node_modules'),
        core: path.resolve(__dirname, 'src/contrib/vue-material/src/core')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: babelConfig
            }
          ]
        },
        {
          test: /\.sass|\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                // allChunks: false,
                // Prefer Dart Sass
                implementation: require('sass'),
                // See https://github.com/webpack-contrib/sass-loader/issues/804
                webpackImporter: true,
                sassOptions: {
                  includePaths: [
                    path.resolve(__dirname, "./node_modules"),
                    path.resolve(__dirname, "./node_modules/compass-mixins/lib")
                  ]
                }
              }
            },
          ]
        },
        {
          test: /\.html$/i,
          use: 'raw-loader',
        },
        {
          test: /\.ya?ml$/,
          use: 'yaml-loader',
          type: 'json',
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: "/"
    },
    devtool: "source-map",
    plugins: [
      new MiniCssExtractPlugin({}),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
        FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
        title: env.title ?? 'Opportunity and Resource Connector',
        hash: true,
        version: env.version
      }),
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(api_url),
        FLAG_SPLIT_SEARCH: JSON.stringify(env.split_search ?? false),
        FLAG_NEW_RESULTS: JSON.stringify(env.flag_new_results ?? false)
      })
    ],
  }
}
