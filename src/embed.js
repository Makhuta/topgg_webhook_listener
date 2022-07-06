const { MessageBuilder } = require("discord-webhook-node");

module.exports = function (vote) {
  return new MessageBuilder()
    .setTitle(`Voted`)
    .setURL(`https://top.gg/bot/${process.env.TOPGGID}`)
    .setDescription(`<@${vote.user}> Voted for <@${vote.bot}>!`)
    .addField("First field", "this is inline", true)
    .addField("Second field", "this is not inline")
    .setColor("#00b0f4")
    .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
    .setImage("https://cdn.discordapp.com/embed/avatars/0.png")
    .setFooter("Hey its a footer", "https://cdn.discordapp.com/embed/avatars/0.png")
    .setTimestamp();
};
