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
    let embed = new discordWebhook.MessageBuilder()
      .setTitle("My title here")
      .setAuthor("Author here", "https://cdn.discordapp.com/embed/avatars/0.png", "https://www.google.com")
      .setURL("https://www.google.com")
      .addField("First field", "this is inline", true)
      .addField("Second field", "this is not inline")
      .setColor("#00b0f4")
      .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
      .setDescription("Oh look a description :)")
      .setImage("https://cdn.discordapp.com/embed/avatars/0.png")
      .setFooter("Hey its a footer", "https://cdn.discordapp.com/embed/avatars/0.png")
      .setTimestamp();

    hook.send(embed);

    console.log(vote);
  })
);

app.listen(port);
