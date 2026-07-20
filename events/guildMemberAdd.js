const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const config = require("../config/config");

module.exports = {
  name: "guildMemberAdd",

  async execute(member) {
    const channel = member.guild.channels.cache.get(config.welcomeChannel);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(config.embedColor)
      .setTitle(`👋 Welcome ${member.user.username}!`)
      .setDescription(
        `Welcome to **${config.serverName}**!\n\nWe're glad to have you here. Enjoy your stay! 🎉`
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("member_count")
        .setLabel(`👥 Members: ${member.guild.memberCount}`)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true)
    );

    await channel.send({
      content: `## Welcome ${member}`,
      embeds: [embed],
      components: [row],
    });
  },
};
