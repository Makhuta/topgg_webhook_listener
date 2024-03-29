const { join } = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Webhook, Api } = require(`@top-gg/sdk`);
const discordWebhook = require("discord-webhook-node");
const { isUndefined } = require("util");
const hook = new discordWebhook.Webhook(process.env.DISCORDWEBHOOKURL);
const StatsHook = new discordWebhook.Webhook(process.env.STATSWEBHOOKURL);
const hookTest = new discordWebhook.Webhook(process.env.DISCORDWEBHOOKURLTEST);
global.ROOT = __dirname;
global.SRC = join(ROOT, "src");
global.Userstats = {};
global.InfoCache = {}

const port = process.env.PORT || 3000;

const app = express();
const wh = new Webhook(process.env.WEBHOOKAUTH);
const api = new Api(process.env.TOPGGTOKEN);

app.use(bodyParser.json());
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
    let Avatar = AllVotes.find((user) => user.id == vote.user)?.avatar;
    let BotInfo = await api.getBot(process.env.TOPGGID);
    vote["timestamp"] = timestamp;
    vote["isWeekend"] = (await api.isWeekend()).toString();
    vote["totalVotes"] = AllVotes.length;
    vote["Userstats"] = votedUser;
    vote["Avatar"] = Avatar ? Avatar.replace("images", "cdn").replace("net", "com") : `https://cdn.discordapp.com/embed/avatars/1.png`;
    vote["BotAvatar"] = `https://cdn.discordapp.com/avatars/${process.env.TOPGGID}/${BotInfo.avatar}.png?size=512`;
    vote["BotName"] = BotInfo.username;

    if (Math.abs(vote["Userstats"].LastVoteTimestamp - vote.timestamp) < 40000) return console.info("Skipping Top.gg retry.");

    if (Math.abs(vote.Userstats.LastVoteTimestamp - vote.timestamp) < 86400) {
      vote.Userstats.ComboVotes += 1;
      Userstats[vote.user].ComboVotes = vote.Userstats.ComboVotes;
    } else {
      vote.Userstats.ComboVotes = 1;
      Userstats[vote.user].ComboVotes = vote.Userstats.ComboVotes;
    }

    Userstats[vote.user].LastVoteTimestamp = vote.timestamp;

    let embed = require(join(SRC, "VoteEmbed.js"))(vote);

    if (vote.type == "test") {
      hookTest.send(embed);
    } else {
      await require(join(SRC, "updateDB.js"))(vote);
      hook.send(embed);
    }
  })
);

app.post("/maveric-stats", (req, res) => {
  let infoFormatted = {
    State: req.body.data.state,
    Action: req.body.action,
    Skip: false
  };

  if (infoFormatted.State == "crashed") {
    infoFormatted["Type"] = "Crashed";
  } else if (infoFormatted.State == "up") {
    infoFormatted["Type"] = "Restarted";
  } else {
    infoFormatted["Type"] = "Unknown";
    infoFormatted["Skip"] = true;
  }

  InfoCache[Date.now()] = infoFormatted

  if (!infoFormatted.Skip) {
    let embed = require(join(SRC, "StatEmbed.js"))(infoFormatted);
    console.info(InfoCache)
    InfoCache = {}
    StatsHook.send(embed);
  }

  res.status(200).end();
});

app.listen(port, () => {
  require(join(SRC, "dbinit.js"));
  console.info(`Listening on port ${port}`);
});
