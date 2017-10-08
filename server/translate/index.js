import all from './all';
import update from './update';

const index = (req, res) => {
  res.render('translate/index', {title: 'hello', message: 'welcome there'});
};

export default {
  all,
  update,
  index,
};