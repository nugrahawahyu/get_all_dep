const https = require('https');

module.exports = class {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  get (path) {
    return new Promise ((resolve, reject) => {

      https.get(`${this.baseUrl}/${path}`, (resp) => {
        let res = '';

        resp.on('data', (chunk) => {
          res += chunk;
        });

        resp.on('end', () => {
          resolve(res)
        });

      }).on("error", (err) => {
        reject(err.message)
      });
    })
  }
}