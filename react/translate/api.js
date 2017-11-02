import request from '../../common/request';
import groupBy from 'lodash/groupBy';
import log from '../../common/log';

export const getTranslationValues = () => {
  return request.get(window.location.origin + '/translate/all')
    .catch((err) => log.error(err));
};

export const updateKeys = (data) => {
  return request({
    url: window.location.origin + '/translate/update',
    json: data,
    method: 'POST'
  });
};

export const getBookmarks = () => {
  return request.get('https://one-sky-translation.firebaseio.com/.json?print=pretty')
    .catch((err) => log.error(err));
};
