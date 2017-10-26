var CardTemplate = require('../models').CardTemplate;
//新建一个LIST
exports.newCardTemplate = function (data) {
  return CardTemplate.create(data);
};

exports.getSelfIssuedCardTemplates = function (userid) {
  return CardTemplate.find({issuer: userid}).sort({_id: -1});
};

exports.findOneById = function (id) {
  return CardTemplate.findOne({_id: id});
};
