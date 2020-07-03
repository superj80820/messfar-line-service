const model = require('./model')
const lineService = require('./external/lineService')
const { uuid } = require('uuidv4');
const utils = require('./utils')
const fs = require('fs');
const recognitionService = require('./external/recognitionService')

async function textController (req, res) {
  try {
    switch (req.body.events[0].message.text) {
      case '許願':
        const [randomFaceResult, randomFaceError] = await recognitionService.randomFace()
        if (randomFaceError) {
          // TODO: 回傳辨識失敗的訊息
        }
        const [, error] = await lineService.reply([
          {
            "type": "flex",
            "altText": "天使已出現～",
            "contents": {
              "type": "carousel",
              "contents": utils.arrayApplyToTemplage(randomFaceResult, model.applyWishTemplate)
            }
          }
        ], req.body.events[0].replyToken)
        if (error) {
          // TODO: error handling
          console.error(error)
        }
        break
      case '使用說明':
        const [, tutorialError] = await lineService.reply([
          {
            "type":"text",
            "text": "你好!請對我們傳送圖片~\n我們來幫你找你的天使w\n\n對了 你可以拍照截圖做到以下幾點 天使會更容易找到：\n１．正面臉\n２．清晰照\n３．不截到其他人頭\n\n另外 你可以 \n輸入\"許願\"：來找尋天使\n\n有任何問題都可以回報粉專喔~\nhttps://www.facebook.com/377946752672874"
          }
        ], req.body.events[0].replyToken)
        if (tutorialError) {
          // TODO: error handling
          console.error(InfoError)
        }
        break
    }
  } catch (error) {
    // TODO: error handling
    console.error(error)
  }
}

async function imageController (req, res) {
  try {
    if (utils.whetherExcuteImageController(req)) return
    const imageName = `${new Date().getTime().toString()}-${uuid()}`
    const savePath = './temp'
    const [getImageResult, getImageError] = await lineService.getImage(req.body.events[0].message.id)
    if (getImageError) {
      // TODO: 回傳辨識失敗的訊息
    }
    // TODO: 不儲存，而是直接使用memery
    // TODO: 可考慮是否要刪除圖片
    fs.writeFileSync(`${savePath}/${imageName}`, getImageResult, 'binary');
    const [searchFaceResult, searchFaceError] = await recognitionService.searchFace(`${savePath}/${imageName}`)
    if (searchFaceError) {
      // TODO: 回傳辨識失敗的訊息
    }
    const [, error] = await lineService.reply([
      {
        "type": "flex",
        "altText": "辨識完成！請查看～",
        "contents": {
          "type": "carousel",
          "contents": utils.arrayApplyToTemplage(searchFaceResult, model.applyRecognitionTemplate)
        }
      }
    ], req.body.events[0].replyToken)
    if (error) {
      // TODO: error handling
      console.error(error)
    }
  } catch (error) {
    // TODO: error handling
    console.error(error)
  }
}

module.exports = {
  textController,
  imageController
}