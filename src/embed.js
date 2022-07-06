const { MessageBuilder } = require("discord-webhook-node");

module.exports = function (vote) {
  let timestamp = Math.round(Date.now() / 1000);
  let nextVoteTimestamp = timestamp + 43200;
  console.info(vote);
  return new MessageBuilder()
    .setTitle(`Voted`)
    .setURL(`https://top.gg/bot/${process.env.TOPGGID}`)
    .setDescription(`<@${vote.user}> Voted for <@${vote.bot}>!`)
    .addField("User:", `<@${vote.user}>`, true)
    .addField("Bot:", `<@${vote.bot}>`, true)
    .addField("Voted at:", `<t:${timestamp}:f>`, true)
    .addField("Can vote again at:", `<t:${nextVoteTimestamp}:R>`, true)
    .addField("Total Votes:", `TBD`, true)
    .addField("Is weekend:", vote.isWeekend.replace("true", "✅").replace("false", "❌"), true)

    .setColor("RANDOM")
    .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
    .setImage("https://cdn.discordapp.com/embed/avatars/0.png")
    .setFooter("Hey its a footer", "https://cdn.discordapp.com/embed/avatars/0.png")
    .setTimestamp();
};
