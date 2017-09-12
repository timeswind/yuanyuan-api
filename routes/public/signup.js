const Models = require('../../lib/core')
const $User = Models.$User
const jwt = require('koa-jwt')
const fs = require('fs')
const config = require('config-lite');
const privateKey = fs.readFileSync(config.privateKeyName);
const crypto = require('crypto')

exports.post = function* () {
  var data = this.request.body;
  data.password = $User.generateHash(data.password)

  var userExist = yield $User.getUserByEmail(data.email);
  if (userExist) {
    this.status = 400;
    this.body = {
      error: 'EMAIL_EXIST'
    };
    return false;
  }

  var newUser = yield $User.addUser(data);

  let payload = {
    name: data.name,
    id: newUser.id,
    email: data.email,
    role: newUser.role,
    school: data.school
  };

  let token = jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '7d'});

  this.body = {
    success: true,
    name: payload.name,
    id: payload.id,
    email: payload.email,
    role: payload.role,
    school: payload.school,
    token: token
  };
};
