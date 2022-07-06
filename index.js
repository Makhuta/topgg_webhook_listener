const { join } = require("path");
const express = require("express");
require("dotenv").config();
const { Webhook, Api } = require(`@top-gg/sdk`);
const discordWebhook = require("discord-webhook-node");
const { isUndefined } = require("util");
const hook = new discordWebhook.Webhook(process.env.DISCORDWEBHOOKURL);
const hookTest = new discordWebhook.Webhook(process.env.DISCORDWEBHOOKURLTEST);
global.ROOT = __dirname;
global.SRC = join(ROOT, "src");
global.Userstats = {};

const port = process.env.PORT || 3000;

const app = express();
const wh = new Webhook(process.env.WEBHOOKAUTH);
const api = new Api(process.env.TOPGGTOKEN);

app.post(
  "/dblwebhook",
  wh.listener(async (vote) => {
    let timestamp = Math.round(Date.now() / 1000);
    let votedUser = Userstats[vote.user];

    if (isUndefined(votedUser)) {
      Userstats[vote.user] = {
        id: vote.user,
        LastVoteTimestamp: 0,
        TotalVotes: 0,
        ComboVotes: 0,
        existed: false
      };
      votedUser = Userstats[vote.user];
    }

    let AllVotes = await api.getVotes();
    vote["timestamp"] = timestamp;
    vote["isWeekend"] = (await api.isWeekend()).toString();
    vote["totalVotes"] = AllVotes.length;
    vote["Avatar"] = AllVotes.find((user) => user.id == vote.user)?.avatar;
    vote["Userstats"] = votedUser;

    //if (Math.abs(vote["Userstats"].LastVoteTimestamp - vote.timestamp) < 40000) return console.info(vote);

    if (Math.abs(vote.Userstats.LastVoteTimestamp - vote.timestamp) < 86400) {
      vote.Userstats.ComboVotes += 1;
      Userstats[vote.user].ComboVotes = vote.Userstats.ComboVotes;
      comboVotes = Userstats[vote.user].ComboVotes;
    }

    Userstats[vote.user].LastVoteTimestamp = vote.timestamp;

    let embed = require(join(SRC, "embed.js"))(vote);

    if (vote.type == "test") {
      require(join(SRC, "updateDB.js"))(vote);
      hookTest.send(embed);
    } else {
      require(join(SRC, "updateDB.js"))(vote);
      hook.send(embed);
    }
  })
);

app.listen(port, () => {
  require(join(SRC, "dbinit.js"));
  console.info(`Listening on port ${port}`);
});
