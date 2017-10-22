import reduce from 'lodash/reduce';
import split from 'lodash/split';

import getAuthForOneSky from './helper/getAuthForOneSky';
import log from '../../common/log';
import conf from '../config';
import request from '../../common/request';

export default function () {
  const uri = `https://platform.api.onesky.io/1/projects/${conf.get('PROJECT_ID')}/translations`;
  const locales = split(conf.get('LOCALES'), ',');

  const translations = reduce(locales, (acc, locale) => {
    const qs = getAuthForOneSky({locale, source_file_name: 'locale.json'});
    acc.push(request.get({uri, qs,}).catch((err) => log.error(err)));

    return acc;
  }, []);

  return Promise.all(translations)
    .then((responses) => {
      return reduce(locales, (acc, locale, idx) => {
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
