const utils = require('../utils');
const fs = require('fs');
const lodash = require('lodash');

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
  return [
    results
      .reduce((previous, current) => {
        if (lodash.get(previous, `[${previous.length - 1}].name`) !== current.name) {
          previous.push(current)
        }
        return previous
      }, [])
      .map(result => ({
        imageUrl: result.preview,
        name: result.name,
        recognitionPercentage: `${parseInt(result.recognitionPercentage)}%`,
        description: result.detail})),
    null
  ]
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
    description: result.detail
  })), null]
}

module.exports = {
  searchFace,
  randomFace
}