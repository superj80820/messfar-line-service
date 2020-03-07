const model = require('./model')

function arrayApplyToTemplage (array, applyTemplateFunction) {
  return array
    .map(item => applyTemplateFunction(item))
}

function whetherExcuteImageController (req) {
  return (
    req.body.events[0].source.type !== 'user'
  ) ? true : false
}

module.exports = {
  arrayApplyToTemplage,
  whetherExcuteImageController
}