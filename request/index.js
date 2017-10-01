import rp from "request-promise";
import get from 'lodash/get';
import log from '../log';

const clone = (value) => {
  return {
    ...value
  };
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
          log.httpRequest('request: %O', data);

        }).on('response', function(res) {
          if (this.callback) {
            // callback specified, request will buffer the body for
            // us, so wait until the complete event to do anything
          } else {
            // cannot get body since no callback specified
            log.httpResponse('response: %O', {
              headers    : clone(res.headers),
              statusCode : res.statusCode
            }, this);
          }

        }).on('complete', function(res, body) {
          if (this.callback) {
            log.httpComplete('response: %O', {
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