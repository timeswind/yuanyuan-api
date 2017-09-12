var Article = require('../models').Article;
//新建一个LIST
exports.newArticle = function (data) {
  return Article.create(data);
};

exports.getSelfArticles = function (userid) {
  return Article.find({user: userid}).sort({_id: -1}).populate('user', 'name');
};

exports.getAllArticles = function () {
  return Article.find({}).sort({_id: -1}).populate('user', 'name');
};

exports.findOneById = function (id) {
  return Article.findOne({_id: id});
};
