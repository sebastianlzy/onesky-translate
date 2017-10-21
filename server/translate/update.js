import queryString from 'querystring';
import reduce from 'lodash/reduce';

import getAuthForOneSky from './helper/getAuthForOneSky';
import conf from '../config';
import request from '../../common/request';
import log from '../../common/log';

export default function (req, res) {
  const uri = `https://platform.api.onesky.io/1/projects/${conf.get('PROJECT_ID')}/files?${queryString.stringify(getAuthForOneSky())}`;

  const translations = reduce(conf.get('LOCALES'), (acc, locale) => {
    const formData = {
      locale,
      file: {
        value: JSON.stringify({test1: 'test2'}),
        options: {
          filename: 'locale.json'
        }
      },
      file_format: 'HIERARCHICAL_JSON',
    };

    acc.push(request({
      method: 'POST',
      url: uri,
      formData,
      is_keeping_all_strings: 'true',
      is_allow_translation_same_as_original: 'false',
    }));

    return acc;
  }, []);

  return Promise.all(translations);
}