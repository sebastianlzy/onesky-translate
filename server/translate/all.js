import reduce from 'lodash/reduce';

import getAuthForOneSky from './helper/getAuthForOneSky';
import log from '../../common/log';
import conf from '../config';
import request from '../../common/request';

export default function (req, res) {
  const uri = `https://platform.api.onesky.io/1/projects/${conf.get('PROJECT_ID')}/translations`;

  const translations = reduce(conf.get('LOCALES'), (acc, locale) => {
    const qs = getAuthForOneSky({locale, source_file_name: 'locale.json'});
    acc.push(request.get({uri, qs,}).catch((err) => log.error(err)));

    return acc;
  }, []);

  return Promise.all(translations)
    .then((responses) => {
      const translations = conf.get('LOCALES');

      reduce(translations, (acc, locale, idx) => {
        acc = [
          ...acc,
          ...reduce(JSON.parse(responses[idx]), (values, value, key) => {
            values.push({key, text: value, locale: locale});
            return values;
          }, [])
        ];
        return acc;
      }, []);
    });

}
