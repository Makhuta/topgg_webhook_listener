const { MessageBuilder } = require("discord-webhook-node");

module.exports = function (info) {
  let timestamp = Math.round(Date.now() / 1000);
  let embed = new MessageBuilder()
    .setTitle("Bot stats update")
    .setDescription(`Maveric has ${info.Type}`)
    .setColor("RANDOM")
    .setThumbnail("https://cdn.discordapp.com/avatars/579640349857677362/5b14903391aaae4a37f6e224ecf7f92d.png?size=512")
    .setFooter("Maveric", "https://cdn.discordapp.com/avatars/579640349857677362/5b14903391aaae4a37f6e224ecf7f92d.png?size=512")
    .setTimestamp();
  if (info.State == "crashed") {
    embed.addField("Crashed at:", `<t:${timestamp}:f>`, true);
  } else if (info.State == "up") {
    embed.addField("Online since:", `<t:${timestamp}:R>`, true);
  }

  return embed;
};
