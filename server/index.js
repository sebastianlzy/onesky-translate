import express from 'express';

import translate from './translate';

const app = express();

app.set('view engine', 'pug');

app.get('/', translate.index);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});