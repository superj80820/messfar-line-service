require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controller')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/lineWebhook', async function (req, res) {
  switch (req.body.events[0].message.type) {
    case 'text':
      controller.textController(req, res)
      break
    case 'image':
      controller.imageController(req, res)
      break
  }
  res.sendStatus(204)
})

app.listen(3000)
