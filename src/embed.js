const { MessageBuilder } = require("discord-webhook-node");

module.exports = function (vote) {
  let nextVoteTimestamp = vote.timestamp + 43200;
  return new MessageBuilder()
    .setTitle(`Voted`)
    .setURL(`https://top.gg/bot/${process.env.TOPGGID}`)
    .setDescription(`<@${vote.user}> Voted for <@${vote.bot}>!`)
    .addField("User:", `<@${vote.user}>`, true)
    .addField("Bot:", `<@${vote.bot}>`, true)
    .addField("Voted at:", `<t:${vote.timestamp}:f>`, true)
    .addField("Can vote again at:", `<t:${nextVoteTimestamp}:R>`, true)
    .addField("Total Votes:", vote.Userstats.TotalVotes, true)
    .addField("Current VOte combo:", vote.Userstats.ComboVotes, true)
    .addField("Is weekend:", vote.isWeekend.replace("true", "✅").replace("false", "❌"), true)
    .addField("Bot total votes:", vote.totalVotes, true)

    .setColor("RANDOM")
    .setThumbnail(vote.Avatar)
    .setTimestamp();
};
