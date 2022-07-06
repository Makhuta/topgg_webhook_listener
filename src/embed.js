const { MessageBuilder } = require("discord-webhook-node");

module.exports = function (vote) {
  let timestamp = Math.round(Date.now() / 1000);
  let nextVoteTimestamp = timestamp + 43200;
  console.info({ timestamp, nextVoteTimestamp });
  return new MessageBuilder()
    .setTitle(`Voted`)
    .setURL(`https://top.gg/bot/${process.env.TOPGGID}`)
    .setDescription(`<@${vote.user}> Voted for <@${vote.bot}>!`)
    .addField(
      { name: "User:", value: `<@${vote.user}>`, inline: true },
      { name: "Bot:", value: `<@${vote.bot}>`, inline: true },
      { name: "Voted at:", value: `test<t:${timestamp}:f>`, inline: true },
      { name: "Can vote again at:", value: `test<t:${nextVoteTimestamp}:R>`, inline: true }
    )

    .setColor("RANDOM")
    .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
    .setImage("https://cdn.discordapp.com/embed/avatars/0.png")
    .setFooter("Hey its a footer", "https://cdn.discordapp.com/embed/avatars/0.png")
    .setTimestamp();
};
