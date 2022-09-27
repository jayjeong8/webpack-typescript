const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/components/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        // 폴리필을 위해 ts-loader 대신 babel-loader 사용
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // HtmlWebpackPlugin : 변경된 내용을 반영한 index.html 파일을 dist 폴더에 생성해준다.
  // ForkTsCheckerWebpackPlugin : 타입스크립트 문법을 체크해준다.(babel ts는 문법체크x)
  plugins: [
    new HtmlWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      // babel-loader와 함께 사용할 경우 필요한 설정
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    alias: {
      '@comp': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@img': path.resolve(__dirname, 'src/images'),
    },
  },
};
