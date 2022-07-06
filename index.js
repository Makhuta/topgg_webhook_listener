const { join } = require("path");
const express = require("express");
const { Webhook } = require(`@top-gg/sdk`);
const discordWebhook = require("discord-webhook-node");
const hook = new discordWebhook.Webhook(process.env.DISCORDWEBHOOKURL);

const port = process.env.PORT || 3000;

const app = express();
const wh = new Webhook(process.env.WEBHOOKAUTH);

app.post(
  "/dblwebhook",
  wh.listener((vote) => {
    let embed = require(join("./src", "embed.js"))(vote);
    hook.send(embed);

    console.log(vote);
  })
);

app.listen(port);
