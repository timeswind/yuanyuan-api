const Models = require('../../lib/core')
const $User = Models.$User
const jwt = require('koa-jwt')
const fs = require('fs')
const config = require('config-lite');
const privateKey = fs.readFileSync(config.privateKeyName);
const crypto = require('crypto')

exports.post = function* () {
  var postData = this.request.body;

  var newUserData = {
    name: postData.name,
    email: postData.email,
    password: $User.generateHash(postData.password),
    role: 2,
    school: postData.school
  };

  var newUser = yield $User.addUser(newUserData);

  let payload = {
    id: newUser.id,
    email: newUserData.email,
    role: newUserData.role,
    school: newUserData.school,
    name: newUserData.name
  };

  let token = jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '7d'});

  this.body = {
    success: true,
    id: payload.id,
    name: payload.name,
    school: payload.school,
    email: payload.email,
    role: payload.role,
    token: token
  };
};
