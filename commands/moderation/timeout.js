const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a member.")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to timeout")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("minutes")
        .setDescription("Timeout duration in minutes")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("reason")
        .setDescription("Reason for timeout")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const minutes = interaction.options.getInteger("minutes");
    const reason =
      interaction.options.getString("reason") || "No reason provided.";

    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(() => null);

    if (!member) {
      return interaction.reply({
        content: "❌ User not found.",
        ephemeral: true,
      });
    }

    if (!member.moderatable) {
      return interaction.reply({
        content: "❌ I can't timeout this member.",
        ephemeral: true,
      });
    }

    await member.timeout(minutes * 60 * 1000, reason);

    await interaction.reply({
      content: `✅ **${user.tag}** has been timed out for **${minutes} minute(s)**.\n**Reason:** ${reason}`,
    });
  },
};
