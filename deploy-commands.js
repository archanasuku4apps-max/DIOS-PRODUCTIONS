require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all available commands.")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Shows information about a user.")
    .addUserOption(option =>
      option.setName("user").setDescription("Select a user").setRequired(false)
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Shows information about the server.")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Shows a user's avatar.")
    .addUserOption(option =>
      option.setName("user").setDescription("Select a user").setRequired(false)
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("ticketpanel")
    .setDescription("Send the support ticket panel.")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member from the server.")
    .addUserOption(option =>
      option.setName("user").setDescription("User to ban").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("Reason").setRequired(false)
    )
    .toJSON(),

new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Kick a member from the server.")
  .addUserOption(option =>
    option
      .setName("user")
      .setDescription("User to kick")
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("reason")
      .setDescription("Reason")
      .setRequired(false)
  )
  .toJSON(),

new SlashCommandBuilder()
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
      .setDescription("Reason")
      .setRequired(false)
  )
  .toJSON(),

new SlashCommandBuilder()
  .setName("untimeout")
  .setDescription("Remove a member's timeout.")
  .addUserOption(option =>
    option
      .setName("user")
      .setDescription("User to remove timeout from")
      .setRequired(true)
  )
  .toJSON(),

new SlashCommandBuilder()
  .setName("purge")
  .setDescription("Delete multiple messages.")
  .addIntegerOption(option =>
    option
      .setName("amount")
      .setDescription("Number of messages to delete (1-100)")
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(100)
  )
  .toJSON(),

new SlashCommandBuilder()
  .setName("warn")
  .setDescription("Warn a member.")
  .addUserOption(option =>
    option
      .setName("user")
      .setDescription("User to warn")
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("reason")
      .setDescription("Reason for the warning")
      .setRequired(true)
  )
  .toJSON(),

new SlashCommandBuilder()
  .setName("robloxpanel")
  .setDescription("Create the Roblox status panel.")
  .toJSON(),

];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash commands registered!");
  } catch (error) {
    console.error(error);
  }
})();
