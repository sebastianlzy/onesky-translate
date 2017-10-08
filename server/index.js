import express from 'express';

import translate from './translate';

const app = express();

app.set('view engine', 'pug');

app.get('/translations', translate.index);
app.get('/translations/all', translate.all);
app.get('/translations/update', translate.update);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});