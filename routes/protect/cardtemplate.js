var Models = require('../../lib/core');
// var _ = require('lodash');
var $CardTemplate = Models.$CardTemplate;

exports.post = function* () {
  var newCardTemplateData = this.request.body
  newCardTemplateData['issuer'] = this.state.user.id

  var newCardTemplate = yield $CardTemplate.newCardTemplate(newCardTemplateData)

  if (newCardTemplate) {
    this.status = 200
    this.body = {
      success: true,
      newCardTemplate: newCardTemplate
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      error: 'Fail to add new card template'
    }
  }
};

exports.get = function* () {
  var card_template_id = this.request.query.id
  var cardtemplate = yield $CardTemplate.findOneById(card_template_id)
  if (cardtemplate) {
    this.status = 200;
    this.body = {
      success: true,
      cardtemplate: cardtemplate
    };
  } else {
    this.status = 404;
    this.body = {
      success: false,
      cardtemplate: {}
    };
  }
};
