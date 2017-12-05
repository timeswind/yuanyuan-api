var User = require('./user');
var Article = require('./article');
var Card = require('./card');
var CardTemplate = require('./cardtemplate');
var Store = require('./store');

module.exports = {
  get $User () {
    return User;
  },
  get $Article () {
    return Article;
  },
  get $Card () {
    return Card;
  },
  get $CardTemplate () {
    return CardTemplate;
  },
  get $Store() {
    return Store;
  }
};
