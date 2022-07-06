const { MessageBuilder } = require("discord-webhook-node");

module.exports = function (vote) {
  return new MessageBuilder()
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
};
