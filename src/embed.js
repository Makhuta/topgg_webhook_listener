const { MessageBuilder } = require("discord-webhook-node");

module.exports = function (vote) {
  let timestamp = Date.now();
  let nextVoteTimestamp = timestamp + 43200000;
  return new MessageBuilder()
    .setTitle(`Voted`)
    .setURL(`https://top.gg/bot/${process.env.TOPGGID}`)
    .setDescription(`<@${vote.user}> Voted for <@${vote.bot}>!`)
    .addField("User:", `<@${vote.user}>`, true)
    .addField("Bot:", `<@${vote.bot}>`, true)
    .addField("Voted at:", `<t:${timestamp}:f>`, true)
    .addField("Can vote again at:", `<t:${nextVoteTimestamp}:f>`, true)

    .setColor("RANDOM")
    .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
    .setImage("https://cdn.discordapp.com/embed/avatars/0.png")
    .setFooter("Hey its a footer", "https://cdn.discordapp.com/embed/avatars/0.png")
    .setTimestamp();
};
