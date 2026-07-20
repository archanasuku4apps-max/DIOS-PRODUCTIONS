const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticketpanel")
    .setDescription("Send the support ticket panel."),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("🎫 DIOS PRODUCTIONS • Support Center")
      .setDescription(
`Need help? Click the button below to open a private support ticket.

### 📋 Before opening a ticket:
• Check if your question has already been answered.
• Clearly describe your issue.
• Attach screenshots if needed.

### ⏱️ Response Time
A member of staff will assist you as soon as possible.

> ⚠️ Please do not open multiple tickets for the same issue.

-# Powered by **DIOS Management Team**`
      )
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("open_ticket")
        .setLabel("Open Ticket")
        .setEmoji("🎫")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
