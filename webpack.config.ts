import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  context: __dirname,
  entry: './front/components/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  mode: 'development',
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
      '@comp': path.resolve(__dirname, 'front/components'),
      '@styles': path.resolve(__dirname, 'front/styles'),
      '@img': path.resolve(__dirname, 'front/images'),
    },
  },
  stats: 'errors-only',
};

export default config;
