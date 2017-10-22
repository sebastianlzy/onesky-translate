import debug from 'debug';

const info = debug('ost:info');
const error = debug('ost:error');
const debugLog = debug('ost:debug');
const httpRequest = debug('ost:http:request');
const httpResponse = debug('ost:http:response');
const httpComplete = debug('ost:http:complete');
const httpRedirect = debug('ost:http:redirect');


export default {
  info,
  error,
  debug: debugLog,
  httpRequest,
  httpResponse,
  httpComplete,
  httpRedirect,
};
