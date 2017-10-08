import md5 from 'md5';
import conf from '../../config';

export default function (options) {
  const timestamp = Math.floor(Date.now() / 1000);

  return {
    api_key: conf.get('ONESKY_PUBLIC_KEY'),
    timestamp: timestamp,
    dev_hash: md5(`${timestamp}${conf.get('ONESKY_SECRET_KEY')}`),
    ...options
  };
}