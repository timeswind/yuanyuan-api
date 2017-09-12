var path = require('path');

module.exports = {
  port: process.env.PORT || 8080,
  privateKeyName: 'platform.rsa',
  publicKeyName: 'platform.rsa.pub',
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/yuanyuan',
    developmentUrl: 'mongodb://127.0.0.1:27017/yuanyuan',
    productionUrl: 'mongodb://127.0.0.1:27017/yuanyuan'
  },
  schemeConf: path.join(__dirname, './default.scheme'),
  routerConf: { wildcard: '_', root: 'routes' }
};
