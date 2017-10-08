import {mapRequestToCurl} from './index';


const request = {
  uri: 'https://platform.api.onesky.io/1/projects/86976/translations?locale=en-sg&api_key=fnR6bJsjD1CvaWGXYgSwptacc4qzLFYQ&timestamp=1507456758988&dev_hash=f4e0d33cf0e8908f5af4c57189e44097&source_file_name=locale.json',
  method: 'GET',
  headers: { host: 'platform.api.onesky.io' }
};

test.only('map request to CURL', () => {
  expect(mapRequestToCurl(request)).toEqual(
    'curl -v -X GET -H \'host: platform.api.onesky.io\' https://platform.api.onesky.io/1/projects/86976/translations?locale=en-sg&api_key=fnR6bJsjD1CvaWGXYgSwptacc4qzLFYQ&timestamp=1507456758988&dev_hash=f4e0d33cf0e8908f5af4c57189e44097&source_file_name=locale.json'
  );
});