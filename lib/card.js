var Card = require('../models').Card;
//新建一个LIST
exports.newCard = function (data) {
  return Card.create(data);
};

exports.getSelfCards = function (userid) {
  return Card.find({holder: userid}).sort({_id: -1});
};

exports.findOneById = function (id) {
  return Card.findOne({_id: id});
};
