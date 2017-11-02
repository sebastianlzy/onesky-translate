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

  // return Promise.resolve([{'key': 'test1', 'text': '123', 'locale': 'en-sg'}, {
  //   'key': 'back_to_all_stores',
  //   'text': 'Back to All Stores 123',
  //   'locale': 'en-sg'
  // }, {'key': 'all_categories', 'text': 'all categories', 'locale': 'en-sg'}, {
  //   'key': 'highest_cashback',
  //   'text': 'highest cashback',
  //   'locale': 'en-sg'
  // }, {'key': 'day_plural', 'text': 'days', 'locale': 'en-sg'}, {
  //   'key': 'day',
  //   'text': 'day',
  //   'locale': 'en-sg'
  // }, {'key': 'days', 'text': 'days', 'locale': 'en-sg'}, {
  //   'key': 'google',
  //   'text': 'android',
  //   'locale': 'en-sg'
  // }, {'key': 'xiaomi', 'text': '123', 'locale': 'en-sg'}, {
  //   'key': 'apple',
  //   'text': 'ios',
  //   'locale': 'en-sg'
  // }, {'key': 'test1', 'text': '123123', 'locale': 'en-my'}, {
  //   'key': 'back_to_all_stores',
  //   'text': 'Back to All Stores 123',
  //   'locale': 'en-my'
  // }, {'key': 'all_categories', 'text': 'all categories', 'locale': 'en-my'}, {
  //   'key': 'highest_cashback',
  //   'text': 'highest cashback',
  //   'locale': 'en-my'
  // }, {'key': 'day_plural', 'text': 'days', 'locale': 'en-my'}, {
  //   'key': 'day',
  //   'text': 'day',
  //   'locale': 'en-my'
  // }, {'key': 'days', 'text': 'days', 'locale': 'en-my'}, {
  //   'key': 'google',
  //   'text': 'android',
  //   'locale': 'en-my'
  // }, {'key': 'xiaomi', 'text': '123', 'locale': 'en-my'}, {'key': 'apple', 'text': 'ios', 'locale': 'en-my'}]);

  return Promise.all(translations)
    .then((responses) => {
      const result = reduce(locales, (acc, locale, idx) => {
        acc = [
          ...acc,
          ...reduce(JSON.parse(responses[idx]), (values, value, key) => {
            values.push({key, text: value, locale: locale});
            return values;
          }, [])
        ];
        return acc;
      }, []);
      return result;
    });

}
