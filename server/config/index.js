import nconf from 'nconf';

nconf
  .argv()
  .env()
  .file({ file: './server/config/common.json' });

export default nconf;