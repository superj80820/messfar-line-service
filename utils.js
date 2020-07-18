const rp = require('request-promise')
const _ = require('lodash')

function arrayApplyToTemplage(array, applyTemplateFunction) {
  return array.map((item) => applyTemplateFunction(item))
}

function whetherExcuteImageController(req) {
  return req.body.events[0].source.type !== 'user' ? true : false
}

const line = {
  getRequestSource(req) {
    const result = _.get(req.body, 'events[0].source.type')
    if (!result) throw new Error('Not have source type')
    return result
  },
  getRequestSourceGroupID(req) {
    const result = _.get(req.body, 'events[0].source.groupId')
    if (!result) throw new Error('Not have source groupId')
    return result
  },
  isInGroup(req) {
    return this.getRequestSource(req) === 'group'
  },
}

function request(options) {
  return rp(options)
    .then((result) => {
      return [result, null]
    })
    .catch((error) => {
      return [null, error]
    })
}

module.exports = {
  arrayApplyToTemplage,
  whetherExcuteImageController,
  request,
  line,
}
