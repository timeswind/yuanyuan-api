var mongoose = require('mongoose');
var config = require('config-lite');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.developmentUrl, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.mongodb.url, err.message);
    process.exit(1);
  }
});

exports.User = require('./User');
exports.Article = require('./Article');
exports.CardTemplate = require('./CardTemplate');
exports.Card = require('./Card');
exports.Store = require('./Store');
