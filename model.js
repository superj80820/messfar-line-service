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

function applyRecognitionTemplate(options = {
  ID: '',
  imageUrl: '',
  name: '',
  recognitionPercentage: '',
  description: ''
}) {
  const recognitionTemplate = JSON.parse(recognitionTemplateFile)
  recognitionTemplate.body.contents[0].contents[0].contents[0].url = options.imageUrl
  recognitionTemplate.body.contents[1].contents[0].action.uri = `https://liff.line.me/1655529572-bv0kM39q/?ID=${options.ID}`
  recognitionTemplate.body.contents[0].contents[1].contents[1].contents[0].text = options.name
  recognitionTemplate.body.contents[0].contents[1].contents[2].text = options.description || "有可能是他呢～"
  recognitionTemplate.body.contents[0].contents[1].contents[4].contents[0].text = options.recognitionPercentage
  return recognitionTemplate
}

function applyWishTemplate(options = {
  ID: '',
  imageUrl: '',
  name: '',
  description: ''
}) {
  const wishTemplate = JSON.parse(wishTemplateFile)
  wishTemplate.body.contents[0].contents[0].contents[0].url = options.imageUrl
  wishTemplate.body.contents[1].contents[0].action.uri = `https://liff.line.me/1655529572-bv0kM39q/?ID=${options.ID}`
  wishTemplate.body.contents[0].contents[1].contents[1].contents[0].text = options.name
  wishTemplate.body.contents[0].contents[1].contents[2].text = options.description || "天使來了～"
  return wishTemplate
}

module.exports = {
  request,
  applyRecognitionTemplate,
  applyWishTemplate
}