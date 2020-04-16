const utils = require('../utils');
const fs = require('fs');

const RECOGNITION_URL = process.env.RECOGNITION_URL

async function searchFace(imagePath) {
  const [results, error] = await utils.request({
    method: 'POST',
    url: `${RECOGNITION_URL}/faces/search`,
    headers: {'content-type': 'multipart/form-data'},
    formData: {image: fs.createReadStream(imagePath)},
    json: true
  })
  if (error) {
    // TODO: error handling
  }
  return [[
    {
      imageUrl: results[0].preview,
      name: results[0].name,
      recognitionPercentage: `${parseInt(results[0].recognitionPercentage)}%`,
      description: results[0].detail || "天使來了～"
    }
  ], null]
}

async function randomFace() {
  const [results, error] = await utils.request({
    method: 'GET',
    url: `${RECOGNITION_URL}/faces/random`,
    qs: {quantity: '1'},
    json: true
  })
  if (error) {
    // TODO: error handling
  }

  return [results.map(result => ({
    imageUrl: result.preview,
    name: result.name,
    description: result.detail || "天使來了～"
  })), null]
}

module.exports = {
  searchFace,
  randomFace
}