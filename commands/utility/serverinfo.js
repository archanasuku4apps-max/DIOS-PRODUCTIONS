const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Shows information about the server."),

  async execute(interaction) {
    const guild = interaction.guild;

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("🏠 Server Information")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: "Server Name", value: guild.name, inline: true },
        { name: "Server ID", value: guild.id, inline: true },
        { name: "Members", value: `${guild.memberCount}`, inline: true },
        {
          name: "Created On",
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
          inline: false,
        }
      )
      .setFooter({ text: "DIOS PRODUCTIONS" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
