import express from 'express';
import bodyParser from 'body-parser';

import translate from './translate';

import log from '../common/log';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/translate', (req, res) => {
  try {
    res.render('translate/index', {title: 'hello', message: 'welcome there'});
  } catch (err) {
    log.error('app : %o', err);
    res.send(err);
  }
});

app.get('/translate/all', (req, res) => {
  translate.all(req, res)
    .catch((err) => log.error('translate/all : %o', err))
    .then((resp) => res.json(resp));
});

app.post('/translate/update', (req, res) => {
  translate.update(req, res)
    .catch((err) => log.error('translate/update : %O -', err))
    .then((resp) => res.json(resp));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
