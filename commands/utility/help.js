const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all available commands."),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("📚 DIOS PRODUCTIONS - Help")
      .setDescription("Welcome to **DIOS PRODUCTIONS**!\n\nHere are the available commands.")
      .addFields(
        {
          name: "🛠 Utility",
          value:
            "`/ping`\n`/help`\n`/userinfo` (Coming Soon)\n`/serverinfo` (Coming Soon)\n`/avatar` (Coming Soon)"
        },
        {
          name: "🚀 Upcoming Features",
          value:
            "🎫 Ticket System\n📈 Level System\n🛡 Moderation\n👋 Welcome System\n📜 Logging\n🔊 Voice Creator"
        }
      )
      .setFooter({
        text: "DIOS PRODUCTIONS"
      })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });

  },
};
