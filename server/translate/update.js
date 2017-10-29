import queryString from 'querystring';
import reduce from 'lodash/reduce';
import map from 'lodash/map';

import getAuthForOneSky from './helper/getAuthForOneSky';
import conf from '../config';
import request from '../../common/request';
import log from '../../common/log';

export default function (req, res) {
  const uri = `https://platform.api.onesky.io/1/projects/${conf.get('PROJECT_ID')}/files?${queryString.stringify(getAuthForOneSky())}`;

  const translations = map(req.body, (translation) => {
    if (!translation.isDirty) {
      return Promise.resolve();
    }
    const formData = {
          locale: translation.locale,
          file: {
            value: JSON.stringify({[translation.key]: translation.text}),
            options: {
              filename: 'locale.json'
            }
          },
          file_format: 'HIERARCHICAL_JSON',
        };
        return request({
          method: 'POST',
          url: uri,
          formData,
          is_keeping_all_strings: 'true',
          is_allow_translation_same_as_original: 'false',
        });
  });

  return Promise.all(translations);
}
