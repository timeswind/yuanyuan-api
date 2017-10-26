var validator = require('validator');
var _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  "POST /public/signup": {
    "request": {
      "body": checkSignupBody
    }
  },
  "POST /public/login": {
    "request": {
      "body": checkLoginBody
    }
  }
};

function checkNewAgentFormBody() {
  let requiredParams = ['name'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.body));
  if (paramsComplete) {
    return true
  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }
}

function protectAppointmentAdvisorid () {
  console.log(this.params)
  return true
}

function checkNewTemplateBody () {
  let requiredParams = ['title', 'fields'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.body));
  if (paramsComplete) {
    // var errors = {}
    this.request.body.fields = this.request.body.fields.map((field)=>{
      var obj = {}
      let requiredFieldParams = ['question', 'type']
      if (_.every(requiredFieldParams, _.partial(_.has, field))) {
        obj['question'] = field['question']
        obj['type'] = field['type']
        if (field['type'] === 'rate') {
          obj['rates'] = field['rates']
        } else if (field['type'] === 'mc') {
          obj['choices'] = field['choices']
        }
      }

      return obj
    })
    return true
  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }
}

function checkGetCalendarQueryForPublic() {
  let requiredParams = ['year', 'month', 'advisor_id'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.query));
  var query = this.request.query

  if (paramsComplete && _.isNumber(parseInt(query.year)) && parseInt(query.year).toString().length === 4 && _.isNumber(parseInt(query.month)) && _.inRange(parseInt(query.month).toString().length, 1, 3) &&ObjectId.isValid(this.request.query.advisor_id)) {
    return true
  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }
}

function checkGetAvailableOfDayOfCalendarForPublic() {
  let requiredParams = ['date', 'advisor_id'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.query));
  var query = this.request.query

  if (paramsComplete && _.isDate(new Date(query.date)) && ObjectId.isValid(query.advisor_id)) {
    return true
  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }
}

function checkGetCalendarQuery() {
  var query = this.request.query
  if (_.has(query, 'year') && _.has(query, 'month')) {
    if (_.isNumber(parseInt(query.year)) && parseInt(query.year).toString().length === 4 && _.isNumber(parseInt(query.month)) && _.inRange(parseInt(query.month).toString().length, 1, 3)) {
      return true
    } else {
      this.status = 400
      this.body = {
        error: 'invalid params'
      }
      return false
    }
  } else if (!(_.has(query, 'year') || _.has(query, 'month'))) {
    return true
  }
}

function checkDeleteOfficeTimeBody() {
  let requiredParams = ['type', 'calendar_id', 'event_id'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.query));
  if (paramsComplete && _.isString(this.request.query.type) && ObjectId.isValid(this.request.query.calendar_id) && ObjectId.isValid(this.request.query.event_id)) {
    return true
  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }
}

function checkAddOfficeTimeBody() {
  let requiredParams = ['day', 'from', 'to'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.body));
  var body = this.request.body
  if (paramsComplete) {
    if (body.year && body.month) {
      this.request.body = _.pick(this.request.body, ['day', 'from', 'to', 'year', 'month'])
      let day = body.day
      let from = body.from
      let to = body.to
      let year = body.year
      let month = body.month
      let monthcodeValid = _.isNumber(parseInt(body.year)) && parseInt(body.year).toString().length === 4 && _.isNumber(parseInt(body.month)) && _.inRange(parseInt(body.month).toString().length, 1, 3)
      if (_.inRange(day, 1, 8) && _.inRange(from, 0, 1441) && _.inRange(to, 0, 1441) && from < to && monthcodeValid) {
        return true
      } else {
        this.status = 400
        this.body = {
          error: 'invalid params'
        }
        return false
      }
    } else {
      this.request.body = _.pick(this.request.body, requiredParams)
      let day = this.request.body.day
      let from = this.request.body.from
      let to = this.request.body.to

      if (_.inRange(day, 1, 8) && _.inRange(from, 0, 1441) && _.inRange(to, 0, 1441) && from < to) {
        return true
      } else {
        this.status = 400
        this.body = {
          error: 'invalid params'
        }
        return false
      }
    }

  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }
}

function checkAddAppointmentbody () {
  let user_role = this.state.user.role
  var requiredParams
  if (user_role === 1) {
    requiredParams = ['advisor','date', 'start', 'end'];
  } else {
    requiredParams = ['client', 'date', 'start', 'end'];
  }
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.body));

  if (paramsComplete) {
    this.request.body = _.pick(this.request.body, ['client', 'advisor', 'date', 'start', 'end', 'note'])
    return true
  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }
}

function checkCreateClientBody () {
  let requiredParams = ['name']
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.body));

  if (paramsComplete) {
    this.request.body = _.pick(this.request.body, ['name', 'phone', 'email'])
    return true
  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }
}

function checkGetListQuery() {
  if (_.has(this.request.query, 'id')) {
    var list_id = this.request.query.id
    if (ObjectId.isValid(list_id)) {
      return true
    } else {
      this.status = 400
      this.body = {
        error: 'Invalid ObjectId'
      }
      return false
    }
  } else {
    this.status = 400
    this.body = {
      error: 'Missing query id'
    }
    return false
  }
}

function checkEditListBody() {
  var body = this.request.body;
  let requiredParams = ['_id', 'name', 'categories', 'brief', 'experience', 'independent']
  var paramsComplete = _.every(requiredParams, _.partial(_.has, body));

  if (paramsComplete) {
    console.log(this.request.body)
    this.request.body = _.pick(body, ['_id', 'name', 'categories', 'phones', 'brief', 'experience', 'addresses', 'independent'])
    if (_.has(this.request.body, 'addresses')) {
      let addresses = this.request.body.addresses
      if (_.isArray(addresses)) {
        var addresses_valid = true
        addresses.forEach((address)=>{
          let requiredKeysForAddress = ['formattedAddress', 'loc']
          let addressKeyComplete = _.every(requiredKeysForAddress, _.partial(_.has, address));
          if (!addressKeyComplete) {
            addresses_valid = false
          }
        })
        if (!addresses_valid) {
          this.status = 400
          this.body = {
            error: 'address in bad format'
          }
          return false
        } else {
          return true
        }
      } else {
        this.status = 400
        this.body = {
          error: 'address in bad format'
        }
        return false
      }
    } else {
      return true
    }
  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }
}

function checkCreateUnclimedListBody() {
  var body = this.request.body;
  let requiredParams = ['categories', 'phones', 'name']
  var paramsComplete = _.every(requiredParams, _.partial(_.has, body));

  if (paramsComplete) {
    let categories = body.categories;
    let phones = body.phones;
    let email = body.email;
    if (_.isNull(phones)) {
      this.status = 400
      this.body = {
        error: 'Missing phone number'
      }
      return false
    }
    else if (email && !validator.isEmail(email)) {
      this.status = 400
      this.body = {
        error: 'Bad email format'
      }
      return false
    }
    else {
      return true
    }
  } else {
    this.status = 400
    return false
  }

}

function checkCreateListBody() {
  var body = this.request.body;
  let requiredParams = ['categories', 'phones', 'brief']
  var paramsComplete = _.every(requiredParams, _.partial(_.has, body));
  // console.log(body)

  if (paramsComplete) {
    let categories = body.categories;
    let phones = body.phones;
    let brief = body.brief;
    if (_.isNull(phones)) {
      this.status = 400
      this.body = {
        error: 'Missing phone number or bad format'
      }
      return false
    }
    else if (_.isNull(brief)) {
      this.status = 400
      this.body = {
        error: 'Missing brief'
      }
      return false
    }
    else {
      return true
    }
  } else {
    this.status = 400
    this.body = {
      error: 'invalid params'
    }
    return false
  }

}

function checkSignupBody() {
  var body = this.request.body;
  var respond;
  if (!body || !body.name) {
    respond = {error: 'Please fill the name field'};
  }
  else if  (!body.email || !validator.isEmail(body.email)) {
    respond = {error: 'Please fill correct email address'};
  }
  else if (!body.password) {
    respond = {error: 'Please enter password'};
  }
  else if (body.password !== body.repassword) {
    respond = {error: 'Two passwords do not match'};
  }
  else if (body.isOrganizationAccount) {
    body.role = 2 // 2 for organization account
  } else {
    body.role = 1 // 1 for normal user account
  }

  if (respond) {
    this.status = 400;
    this.body = respond;
    return false;
  }

  body.email = validator.trim(body.email).toLowerCase();
  body.password = validator.trim(body.password);
  delete body.repassword
  return true;
}

function checkLoginBody() {
  console.log(this.request.body)
  var body = this.request.body;
  var respond;
  if (!body || !body.email) {
    respond = {error: 'Please enter the email!'};
  }
  else if (!body.password) {
    respond = {error: 'Please enter the password!'};
  }
  if (respond) {
    this.status = 400;
    this.body = respond;
    return false;
  } else {
    body.email = validator.trim(body.email);
    body.password = validator.trim(body.password);
    return true;
  }
}
