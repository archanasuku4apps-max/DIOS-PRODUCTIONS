require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
} = require("discord.js");

const fs = require("fs");

const { updateRobloxStatus } = require("./events/robloxStatus");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.data.name, command);
  }
}

client.once(Events.ClientReady, async () => {
  console.log(`✅ ${client.user.tag} is online!`);

  await updateRobloxStatus(client);

client.application.commands.fetch().then(commands => {
  console.log(`Loaded ${commands.size} slash commands.`);
});

  setInterval(async () => {
    await updateRobloxStatus(client);
  }, 60000);
});

const guildMemberAdd = require("./events/guildMemberAdd");

client.on(Events.GuildMemberAdd, async (member) => {
  try {
    await guildMemberAdd.execute(member);
  } catch (err) {
    console.error("Welcome Event Error:", err);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "❌ An error occurred while executing this command.",
      ephemeral: true,
    });
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith("!say")) return;

  if (!message.member.permissions.has("ManageMessages")) {
    return message.reply("❌ You don't have permission to use this command.");
  }

  const text = message.content.slice(5).trim();

  if (!text) {
    return message.reply("Usage: !say <message>");
  }

  await message.delete().catch(() => {});

  message.channel.send(text);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith("!dmuser")) return;

  if (!message.member.permissions.has("ManageMessages")) {
    return message.reply("❌ You don't have permission to use this command.");
  }

  const args = message.content.split(" ");

  const user = message.mentions.users.first();

  if (!user) {
    return message.reply("❌ Usage: !dmuser @user <message>");
  }

  const dmMessage = args.slice(2).join(" ");

  if (!dmMessage) {
    return message.reply("❌ Please provide a message to send.");
  }

  await message.delete().catch(() => {});

  try {
    await user.send(dmMessage);

    await message.channel.send(
      `✅ DM sent successfully to **${user.tag}**.`
    );
  } catch (err) {
    await message.channel.send(
      `❌ Couldn't send a DM to **${user.tag}**.`
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
