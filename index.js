const { join } = require("path");
const express = require("express");
const { Webhook, Api } = require(`@top-gg/sdk`);
const discordWebhook = require("discord-webhook-node");
const hook = new discordWebhook.Webhook(process.env.DISCORDWEBHOOKURL);
const hookTest = new discordWebhook.Webhook(process.env.DISCORDWEBHOOKURLTEST);

const port = process.env.PORT || 3000;

const app = express();
const wh = new Webhook(process.env.WEBHOOKAUTH);
const api = new Api(process.env.TOPGGTOKEN);

app.post(
  "/dblwebhook",
  wh.listener(async (vote) => {
    vote["isWeekend"] = (await api.isWeekend()).toString();
    vote["numOfVotes"] = (await api.getVotes()).length;
    let embed = require(join(__dirname, "src/embed.js"))(vote);

    if (vote.type == "test") {
      hookTest.send(embed);
    } else {
      hook.send(embed);
    }

    console.log(vote);
  })
);

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
