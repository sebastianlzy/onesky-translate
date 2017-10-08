import rp from 'request-promise';
import get from 'lodash/get';
import log from '../log';
import reduce from 'lodash/reduce';

const clone = (value) => {
  return {
    ...value
  };
};

const formatRequestData = requestData => {
  if (requestData) {
    try {
      return `-d '${JSON.stringify(requestData)}' `;
    } catch (e) {
      return '';
    }
  }
  return '';
};

export const mapRequestToCurl = (request) => {

  const headers = reduce(
    request.headers,
    (headers, value, header) => headers + `-H '${header}: ${value}' `,
    ' '
  );

  let requestData = formatRequestData(get(request, 'body', false));

  return `curl -v -X ${request.method}${headers}${requestData}${request.uri}`;
};

const request =  function(request) {

  if (!request.Request) {
    throw 'error getting request';
  }

  const requestPrototype = get(request, 'Request.prototype');

  if (!requestPrototype.initBeforeOverride) {
    requestPrototype.initBeforeOverride = requestPrototype.init;

    requestPrototype.init = function() {
      if (!this.isListenerSet) {

        this.on('request', function(req) {
          let data = {
            uri     : this.uri.href,
            method  : this.method,
            headers : clone(this.headers)
          };
          if (this.body) {
            data.body = this.body.toString('utf8');
          }

          log.httpRequest('%O', mapRequestToCurl(data));

        }).on('complete', function(res) {
          if (this.callback) {
            log.httpComplete('%O', {
              headers    : clone(res.headers),
              statusCode : res.statusCode,
              body       : res.body
            });
          }

        }).on('redirect', function() {
          let type = (this.response.statusCode === 401 ? 'auth' : 'redirect');
          log.httpRedirect(`${type} : %O`, {
            statusCode : this.response.statusCode,
            headers    : clone(this.response.headers),
            uri        : this.uri.href
          });
        });

        this.isListenerSet = true;
      }

      return requestPrototype.initBeforeOverride.apply(this, arguments);
    };
  }

};

request(rp);

export default rp;