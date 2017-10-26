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
// exports.List = require('./List');
// exports.Client = require('./Client');
// exports.Emailverify = require('./Emailverify');
// exports.Appointment = require('./Appointment');
// exports.Calendar = require('./Calendar');
// exports.Siteblog = require('./Siteblog');
// exports.Feedback = require('./Feedback');
// exports.FeedbackTemplate = require('./FeedbackTemplate');
// exports.Agent = require('./Agent');
// exports.Company = require('./Company');
// exports.Sharelist = require('./Sharelist');
// exports.Message = require('./Message');
// exports.Contactlist = require('./Contactlist');
