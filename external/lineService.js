const model = require('../model')

/**
 * @input string imageId
 * @return binary
 */
async function getImage(imageId) {
  return await model.request({
    headers: {
      'Authorization': `Bearer ${process.env.LINE_TOKEN}`
    },
    method: 'GET',
    uri: `https://api-data.line.me/v2/bot/message/${imageId}/content`,
    encoding: 'binary'
  })
}

async function reply(messages, replyToken) {
  return await model.request({
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${process.env.LINE_TOKEN}`
    },
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/reply',
    body: {
      "replyToken": replyToken,
      "messages": messages
    },
    json: true
  })
}

module.exports = {
  getImage,
  reply
}