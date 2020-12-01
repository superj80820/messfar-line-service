const model = require('./model')
const lineService = require('./external/lineService')
const { uuid } = require('uuidv4')
const utils = require('./utils')
const fs = require('fs')
const { promisify } = require('util')
const recognitionService = require('./external/recognitionService')
const redis = require('./storage/redis')

// Controller
async function textController(req, res) {
  try {
    switch (req.body.events[0].message.text) {
      case '許願':
        const [randomFaceResult, randomFaceError] = await recognitionService.randomFace()
        if (randomFaceError) throw randomFaceError
        const [, replyWishError] = await lineService.reply(
          [
            {
              type: 'flex',
              altText: '天使已出現～',
              contents: {
                type: 'carousel',
                contents: utils.arrayApplyToTemplage(randomFaceResult, model.applyWishTemplate),
              },
            },
          ],
          req.body.events[0].replyToken
        )
        if (replyWishError) throw replyWishError
        break
      case '使用說明':
        const [, tutorialError] = await lineService.reply(
          [
            {
              type: 'text',
              text:
                '你好!請對我們傳送圖片~\n我們來幫你找你的天使w\n\n對了 你可以拍照截圖做到以下幾點 天使會更容易找到：\n１．正面臉\n２．清晰照\n３．不截到其他人頭\n\n另外 你可以 \n輸入"許願"：來找尋天使\n\n有任何問題都可以回報粉專喔~\nhttps://www.facebook.com/377946752672874',
            },
          ],
          req.body.events[0].replyToken
        )
        if (tutorialError) throw tutorialError
        break
      case '辨識':
        if (!utils.line.isInGroup(req)) break
        await setSearchInGroupOneTime(req, res)
        const [, replySetSearchInGroupError] = await lineService.reply(
          [
            {
              type: 'text',
              text: '我準備好辨識惹～',
            },
          ],
          req.body.events[0].replyToken
        )
        if (replySetSearchInGroupError) throw replySetSearchInGroupError
        break
    }
  } catch (error) {
    // Error handling
    console.error(error)
  }
}

async function imageController(req, res, next) {
  try {
    switch (utils.line.getRequestSource(req)) {
      case 'group':
        if (!(await isRequireSearchInGroup(req))) break
        await sendSearchFaceImage(req, res, next)
        await clearSearchInGroupOneTimeData(req, res, next)
        break
      case 'user':
        sendSearchFaceImage(req, res, next)
        break
    }
  } catch (error) {
    // Error handling
    console.error(error)
  }
}

// Business logic

async function setSearchInGroupOneTime(req) {
  // Prepare data and handler
  const groupID = utils.line.getRequestSourceGroupID(req)
  const redisHandler = redis()

  // Business logic
  await redisHandler.setKey(groupID, true, 'EX', 3600 * 24) // york debug time
}

async function isRequireSearchInGroup(req) {
  // Prepare data and handler
  const groupID = utils.line.getRequestSourceGroupID(req)
  const redisHandler = redis()

  const isRequireSearchInGroupValue = await redisHandler.getValueByKey(groupID)
  return !!isRequireSearchInGroupValue
}

async function clearSearchInGroupOneTimeData(req) {
  const groupID = utils.line.getRequestSourceGroupID(req)
  const redisHandler = redis()

  await redisHandler.deleteByKey(groupID)
}

async function sendSearchFaceImage(req) {
  const imageName = `${new Date().getTime().toString()}-${uuid()}`
  const savePath = './temp'
  const [getImageResult, getImageError] = await lineService.getImage(req.body.events[0].message.id)
  if (getImageError) {
    // TODO: 回傳辨識失敗的訊息
  }
  // TODO: 不儲存，而是直接使用memery
  // TODO: 可考慮是否要刪除圖片
  fs.writeFileSync(`${savePath}/${imageName}`, getImageResult, 'binary')
  const [searchFaceResult, searchFaceError] = await recognitionService.searchFace(`${savePath}/${imageName}`)
  if (searchFaceError) {
    // TODO: 回傳辨識失敗的訊息
  }
  const [, error] = await lineService.reply(
    [
      {
        type: 'flex',
        altText: '辨識完成！請查看～',
        contents: {
          type: 'carousel',
          contents: utils.arrayApplyToTemplage(searchFaceResult, model.applyRecognitionTemplate),
        },
      },
    ],
    req.body.events[0].replyToken
  )
  if (error) {
    // Error handling
    console.error(error)
  }
  await promisify(fs.unlink)(`${savePath}/${imageName}`)
}

module.exports = {
  textController,
  imageController,
}
