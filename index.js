const express = require("express");
const { Webhook } = require(`@top-gg/sdk`);
const { WebhookClient } = require("discord.js");

const port = process.env.PORT || 3000;

const app = express();
const wh = new Webhook(process.env.WEBHOOKAUTH);
const discordWH = new WebhookClient(process.env.DISCORDWEBHOOKID, process.env.DISCORDWEBHOOKTOKEN);

app.post(
  "/dblwebhook",
  wh.listener((vote) => {
    webhook.send("Hello world.").catch(console.error);
    console.log(vote.user); // => 321714991050784770
  })
);

app.listen(port);
