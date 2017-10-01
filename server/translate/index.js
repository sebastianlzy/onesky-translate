import moment from 'moment';
import md5 from 'md5';

import conf from '../config';
import request from '../../request';
import log from '../../log';

const index = (req, res) => {
  const timestamp = moment().valueOf();
  const authQuery = {
    locale: 'en-sg',
    api_key: conf.get("ONESKY_PUBLIC_KEY"),
    timestamp: timestamp,
    dev_hash: md5(`${timestamp}${conf.get("ONESKY_SECRET_KEY")}`),
    source_file_name: 'locale.json'
  };
  log.debug('%o', authQuery);

  request.get({
      uri: `https://platform.api.onesky.io/1/projects/${86976}/translations`,
      qs: authQuery,

    });


  res.render('translate/index', {title: 'hello', message: 'welcome there'});
};

export default {
  index
};