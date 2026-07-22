const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "../../config/roblox.js");
let config = require("../../config/roblox");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("robloxpanel")
    .setDescription("Create the Roblox status panel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#00b0f4")
      .setTitle("🎮 DIOS ROBLOX STATUS")
      .setDescription("⏳ Loading Roblox data...")
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("🎮 Quick Join")
        .setStyle(ButtonStyle.Link)
        .setURL(config.GAME_URL),

      new ButtonBuilder()
        .setLabel("👤 Owner Profile")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://www.roblox.com/users/profile?username=${config.OWNER}`)
    );

    const msg = await interaction.channel.send({
      embeds: [embed],
      components: [row],
    });

    let text = fs.readFileSync(configPath, "utf8");
    text = text.replace(
      /MESSAGE_ID:\s*".*?"/,
      `MESSAGE_ID: "${msg.id}"`
    );

    fs.writeFileSync(configPath, text);

    delete require.cache[require.resolve("../../config/roblox")];

    await interaction.reply({
      content: `✅ Roblox panel created!\nMessage ID: ${msg.id}`,
      ephemeral: true,
    });
  },
};
