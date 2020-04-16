const rp = require('request-promise')

function arrayApplyToTemplage (array, applyTemplateFunction) {
  return array
    .map(item => applyTemplateFunction(item))
}

function whetherExcuteImageController (req) {
  return (
    req.body.events[0].source.type !== 'user'
  ) ? true : false
}

function request (options) {
  return rp(options)
  .then(result => {
    return [result, null]
  })
  .catch(error => {
    return [null, error]
  })
}

module.exports = {
  arrayApplyToTemplage,
  whetherExcuteImageController,
  request
}