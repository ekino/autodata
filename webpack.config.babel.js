import {resolve} from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import rules from './webpack.loaders';
import ENV from './ENV.json';

const [isProd, isDev, isLocal] = [
  'production', 'development', 'local',
].map(env => process.env.NODE_ENV === env);

// Format vars for webpack ENV process
const formatVars = (VARS) => {
  const obj = {};
  Object.entries(VARS).forEach(([name, value]) => {
    obj[name] = typeof value === 'string' ? JSON.stringify(value) : value;
  });
  return obj;
};

let plugins = [
  new webpack.DefinePlugin({
    __DEV__: isDev || isLocal,
    __ENV__: isLocal ? {
      ...formatVars(ENV),
    } : false,
  }),
];
let entry = {
  autodata: './src/autodata.js',
};

if (isLocal) {
  entry = {
    demo: './src/demo/demo.jsx',
  };
  plugins = plugins.concat([
    new HTMLWebpackPlugin({
      title: 'Autodata',
      template: './src/demo/index.html',
      inject: 'body',
      chunksSortMode: 'none',
    }),
  ]);
}

if (isProd) {
  plugins = plugins.concat([
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: resolve(__dirname, 'report/bundle-analyzer.html'),
    }),
  ]);
}

export default {
  mode: isProd ? 'production' : 'development',
  entry,
  output: {
    path: resolve(`${__dirname}/dist`),
    filename: isProd ? '[name].min.js' : '[name].js',
    library: 'autoData',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules,
  },
  plugins,
};
