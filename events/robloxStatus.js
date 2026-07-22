const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const config = require("../config/roblox");
const { getGameData } = require("../services/robloxApi");

async function updateRobloxStatus(client) {
  try {
    const channel = await client.channels.fetch(config.CHANNEL_ID);
    const message = await channel.messages.fetch(config.MESSAGE_ID);

    const game = await getGameData(config.PLACE_ID);

    if (!game) {
      console.log("❌ Failed to get Roblox game data.");
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(0x00b0f4)
      .setTitle("🎮 DIOS ROBLOX STATUS")
      .setThumbnail(game.thumbnail)
      .setDescription(
`🟢 **Game Status:** Online

🎮 **Game:** ${game.name}

👥 **Players:** ${game.playing}/${game.maxPlayers}
👀 **Visits:** ${game.visits.toLocaleString()}
⭐ **Favorites:** ${game.favorites.toLocaleString()}

🆔 **Place ID:** ${config.PLACE_ID}

👑 **Owner**
\`\`\`
${config.OWNER}
\`\`\`

🛡 **Staff Team**
\`\`\`
• lunaz
• thefluffy
• thevenixDios
• VEGETA
• toji
• anay
\`\`\`
`
)
      .setFooter({
        text: "DIOS PRODUCTIONS",
      })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("🎮 Quick Join")
        .setStyle(ButtonStyle.Link)
        .setURL(config.GAME_URL),

      new ButtonBuilder()
        .setLabel("👤 Owner Profile")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://www.roblox.com/users/profile?username=${config.OWNER}`),

      new ButtonBuilder()
        .setLabel("🌐 Game Page")
        .setStyle(ButtonStyle.Link)
        .setURL(config.GAME_URL)
    );

    await message.edit({
      embeds: [embed],
      components: [row],
    });

    console.log("✅ Roblox status updated.");
  } catch (err) {
    console.error("Roblox Status Error:", err);
  }
}

module.exports = { updateRobloxStatus };
