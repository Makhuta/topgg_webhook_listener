const express = require('express')
const { Webhook } = require(`@top-gg/sdk`)

const app = express()
const wh = new Webhook('webhookauth123')

app.post('/dblwebhook', wh.listener(vote => {
  // vote is your vote object e.g
  console.log(vote.user) // => 321714991050784770
}))

app.listen(80)