const rp = require('request-promise');
const fs = require('fs');
const ow = require('ow');
const recognitionTemplateFile = fs.readFileSync('./template/recognition.json')
const wishTemplateFile = fs.readFileSync('./template/wish.json')

function request (options) {
  return rp(options)
  .then(result => {
    return [result, null]
  })
  .catch(error => {
    return [null, error]
  })
}

function applyRecognitionTemplate(options) {
  ow(options, ow.object.exactShape({
    imageUrl: ow.string,
    name: ow.string,
    recognitionPercentage: ow.string,
    description: ow.string
  }))
  const recognitionTemplate = JSON.parse(recognitionTemplateFile)
  recognitionTemplate.body.contents[0].url = options.imageUrl
  recognitionTemplate.body.contents[1].contents[0].contents[0].text = options.name
  recognitionTemplate.body.contents[1].contents[1].contents[0].text = options.description
  recognitionTemplate.body.contents[2].contents[0].text = options.recognitionPercentage
  return recognitionTemplate
}

function applyWishTemplate(options) {
  ow(options, ow.object.exactShape({
    imageUrl: ow.string,
    name: ow.string,
    description: ow.string
  }))
  const wishTemplate = JSON.parse(wishTemplateFile)
  wishTemplate.body.contents[0].url = options.imageUrl
  wishTemplate.body.contents[1].contents[0].contents[0].text = options.name
  wishTemplate.body.contents[1].contents[1].contents[0].text = options.description
  return wishTemplate
}

module.exports = {
  request,
  applyRecognitionTemplate,
  applyWishTemplate
}