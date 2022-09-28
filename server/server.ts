import express, { Express } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

const app: Express = express();
import config from '../webpack.config';
const compiler = webpack(config);

// express에서 webpack-dev-middleware와 webpack.config.js를 사용하도록 설정.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output?.publicPath || '/',
    // hot: true,
  }),
);

app.listen(3000, function () {
  console.log('서버 동작 중');
});
