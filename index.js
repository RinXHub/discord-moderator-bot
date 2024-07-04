// Deobfuscated By RinX Owner
const fs = require('fs');
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const {
  code,
  token
} = require("./verify");
const {
  QuickDB
} = require("quick.db");
const {
  getConfig
} = require("./src/utils");
const db = new QuickDB();
require("./dashboard");
if (code !== "https://discord.com/invite/aJujGZm8fv") {
  console.error("Verification failed. The bot will not start. Please visit https://discord.com/invite/aJujGZm8fv for get the code");
  process.exit(1);
}
const client = new Client({
  'intents': [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildScheduledEvents]
});
client.commands = new Collection();
client.getConfig = getConfig;
const commands = [];
const commandsPath = path.join(__dirname, "src");
const commandFolders = fs.readdirSync(commandsPath);
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(_0x3ec288 => _0x3ec288.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, folder, file));
    if (command.data && command.data.name) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    }
  }
}
client.once("ready", () => {
  const _0x5d4a8 = new Map();
  const _0x16e967 = fs.readdirSync(commandsPath);
  for (const _0x59cb5e of _0x16e967) {
    const _0x4642f9 = fs.readdirSync(path.join(commandsPath, _0x59cb5e)).filter(_0x22c39c => _0x22c39c.endsWith(".js"));
    _0x5d4a8.set(_0x59cb5e, _0x4642f9.length);
  }
  console.log("[36m\n    ██╗    ██╗██╗ ██████╗██╗  ██╗    ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ \n    ██║    ██║██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗\n    ██║ █╗ ██║██║██║     █████╔╝     ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║\n    ██║███╗██║██║██║     ██╔═██╗     ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║\n    ╚███╔███╔╝██║╚██████╗██║  ██╗    ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝\n     ╚══╝╚══╝ ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝\n    [0m");
  console.log("[33m" + ("🚀 Bot is online! Logged in as " + client.user.tag) + "[0m");
  console.log("[32mCode by Wick Studio\nhttps://discord.gg/wicks[0m");
  console.log("🌍 Serving " + client.guilds.cache.size + " servers.");
  console.log("🛠️ Loaded " + client.commands.size + " commands in " + _0x5d4a8.size + " categories.");
  console.log("✅ Connected to Quick.db Successfully");
  console.log("🌎 Connected to Dashboard Successfully");
  console.log("\n📚 Command Categories and Counts:");
  _0x5d4a8.forEach((_0x5a4203, _0x4e418e) => {
    console.log(" - " + _0x4e418e + " : " + _0x5a4203 + " commands");
  });
  console.log("\n📁 Directory Contents:");
  listDirectoryContents("./src");
  console.log("[32m\n🌟 Bot is ready and awaiting commands!\n[0m");
});
function listDirectoryContents(_0xbc4748, _0x49be45 = "   ") {
  const _0x5453b3 = fs.readdirSync(_0xbc4748, {
    'withFileTypes': true
  });
  _0x5453b3.forEach(_0x1226d5 => {
    console.log('' + _0x49be45 + (_0x1226d5.isDirectory() ? '📁' : '📄') + " " + _0x1226d5.name);
    if (_0x1226d5.isDirectory()) {
      listDirectoryContents(path.join(_0xbc4748, _0x1226d5.name), _0x49be45 + "   ");
    }
  });
}
const eventFolders = ["protection", "logs", "responder", "autorole", "ticket", "giveaway"];
for (const folder of eventFolders) {
  const eventFiles = fs.readdirSync("./src/" + folder).filter(_0x377bee => _0x377bee.endsWith(".js"));
  for (const file of eventFiles) {
    const event = require("./src/" + folder + '/' + file);
    if (Array.isArray(event)) {
      event.forEach(_0x372826 => {
        client.on(_0x372826.name, (..._0xea4d7a) => _0x372826.execute(..._0xea4d7a, client));
      });
    } else if (event.once) {
      client.once(event.name, (..._0x584490) => event.execute(..._0x584490, client));
    } else {
      client.on(event.name, (..._0x5bcf03) => event.execute(..._0x5bcf03, client));
    }
  }
}
client.on("roleCreate", _0x4ee0a0 => {
  require("./src/logs/roleCreate").execute(_0x4ee0a0);
});
client.on("roleDelete", _0x2f0359 => {
  require("./src/logs/roleDelete").execute(_0x2f0359);
});
client.on("roleUpdate", (_0x53a941, _0x531461) => {
  require("./src/logs/roleUpdate").execute(_0x53a941, _0x531461);
});
const rest = new REST({
  'version': '10'
}).setToken(token);
client.once("ready", async () => {
  let _0x4eedf2 = client.getConfig();
  console.log("Logged in as " + client.user.tag + '!');
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(_0x4eedf2.clientId, _0x4eedf2.guildId), {
      'body': commands
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (_0x1f4ca9) {
    console.error(_0x1f4ca9);
  }
});
client.on("interactionCreate", async _0x2ebfdc => {
  if (!_0x2ebfdc.isCommand()) {
    return;
  }
  const _0x2e32be = client.commands.get(_0x2ebfdc.commandName);
  if (!_0x2e32be) {
    return;
  }
  try {
    await _0x2e32be.execute(_0x2ebfdc, client);
  } catch (_0x5459f5) {
    console.error(_0x5459f5);
    await _0x2ebfdc.reply({
      'content': "There was an error executing this command!",
      'ephemeral': true
    });
  }
});
client.on("interactionCreate", async _0x425bc3 => {
  let _0x3b5e8f = client.getConfig();
  if (!_0x425bc3.isButton()) {
    return;
  }
  const _0x285350 = _0x425bc3.user;
  const _0x6d73d1 = _0x425bc3.customId;
  const _0x5e05a9 = Object.keys(_0x3b5e8f.ticketSettings.ticketGroups).find(_0x5ee058 => _0x3b5e8f.ticketSettings.ticketGroups[_0x5ee058].buttonCustomId === _0x6d73d1);
  if (_0x5e05a9) {
    const _0x4b0f0a = _0x285350.id;
    const _0x1e6046 = await db.get("tickets." + _0x4b0f0a);
    if (_0x1e6046 && _0x1e6046.status === "open") {
      console.log("User " + _0x4b0f0a + " attempted to create a new ticket but already has an open ticket.");
      return _0x425bc3.reply({
        'content': "You already have an open ticket.",
        'ephemeral': true
      });
    }
    const _0x2cb614 = _0x3b5e8f.ticketSettings.ticketGroups[_0x5e05a9];
    try {
      const _0x236030 = await _0x425bc3.guild.channels.create({
        'name': _0x5e05a9 + '-' + _0x4b0f0a,
        'type': ChannelType.GuildText,
        'parent': _0x2cb614.ticketCategoryId,
        'permissionOverwrites': [{
          'id': _0x425bc3.guild.id,
          'deny': [PermissionFlagsBits.ViewChannel]
        }, {
          'id': _0x4b0f0a,
          'allow': [PermissionFlagsBits.ViewChannel]
        }, {
          'id': _0x2cb614.supportRoleId,
          'allow': [PermissionFlagsBits.ViewChannel]
        }]
      });
      await db.set("tickets." + _0x4b0f0a, {
        'status': "open",
        'channelId': _0x236030.id,
        'userId': _0x4b0f0a,
        'claimedBy': null
      });
      const _0x1f057a = new EmbedBuilder().setColor(39423).setTitle("New Support Ticket").setDescription("Please describe your issue in detail. Our support team will be with you shortly.").addFields({
        'name': "Ticket Creator",
        'value': '<@' + _0x4b0f0a + '>',
        'inline': true
      }, {
        'name': "Support Role",
        'value': "<@&" + _0x2cb614.supportRoleId + '>',
        'inline': true
      }).setTimestamp();
      if (_0x2cb614.image) {
        _0x1f057a.setImage(_0x2cb614.image);
      }
      const _0xc8867 = new ButtonBuilder().setCustomId("claim_ticket").setLabel("Claim Ticket").setStyle(ButtonStyle.Primary);
      const _0x4a3996 = new ButtonBuilder().setCustomId("close_ticket").setLabel("Close Ticket").setStyle(ButtonStyle.Secondary);
      await _0x236030.send({
        'content': '<@' + _0x4b0f0a + "> , <@&" + _0x2cb614.supportRoleId + '>',
        'embeds': [_0x1f057a],
        'components': [new ActionRowBuilder().addComponents(_0xc8867, _0x4a3996)]
      });
      await _0x425bc3.reply({
        'content': "Your ticket has been created.",
        'ephemeral': true
      });
    } catch (_0x2d49e4) {
      console.error("Failed to create a ticket for user " + _0x4b0f0a + ':', _0x2d49e4);
      await _0x425bc3.reply({
        'content': "There was an error creating your ticket. Please try again later.",
        'ephemeral': true
      });
    }
  } else {
    if (_0x425bc3.customId === "claim_ticket") {
      const [_0x52ac98, _0x2459b7] = _0x425bc3.channel.name.split('-').slice(0, 2);
      const _0x3bb461 = _0x3b5e8f.ticketSettings.ticketGroups[_0x52ac98];
      if (!_0x425bc3.member.roles.cache.has(_0x3bb461.supportRoleId)) {
        return _0x425bc3.reply({
          'content': "Only support team members can claim tickets.",
          'ephemeral': true
        });
      }
      const _0x1d715b = await db.get("tickets." + _0x2459b7);
      if (!_0x1d715b) {
        return _0x425bc3.reply({
          'content': "This ticket does not exist.",
          'ephemeral': true
        });
      }
      if (_0x1d715b.claimedBy) {
        return _0x425bc3.reply({
          'content': "This ticket has already been claimed.",
          'ephemeral': true
        });
      }
      try {
        await _0x425bc3.channel.permissionOverwrites.set([{
          'id': _0x425bc3.guild.id,
          'deny': [PermissionFlagsBits.ViewChannel]
        }, {
          'id': _0x425bc3.user.id,
          'allow': [PermissionFlagsBits.ViewChannel]
        }, {
          'id': _0x2459b7,
          'allow': [PermissionFlagsBits.ViewChannel]
        }], "Ticket claimed");
        await db.set("tickets." + _0x2459b7, {
          ..._0x1d715b,
          'claimedBy': _0x425bc3.user.id
        });
        await _0x425bc3.reply({
          'content': "This ticket has been claimed by <@" + _0x425bc3.user.id + '>.',
          'ephemeral': false
        });
      } catch (_0x289d95) {
        console.error("Failed to update permissions or claim the ticket:", _0x289d95);
        await _0x425bc3.reply({
          'content': "There was an error claiming your ticket. Please try again later.",
          'ephemeral': true
        });
      }
    } else {
      if (_0x425bc3.customId === "close_ticket") {
        console.log("Attempting to close ticket: updating permissions...");
        const [_0x4e6004] = _0x425bc3.channel.name.split('-');
        const _0x8d7379 = _0x3b5e8f.ticketSettings.ticketGroups[_0x4e6004];
        const _0x53feee = _0x425bc3.channel.id;
        const _0x1abaaa = await db.get("tickets." + _0x53feee + ".status");
        if (_0x1abaaa === "closed") {
          console.log("Attempted to close an already closed ticket.");
          return _0x425bc3.reply({
            'content': "This ticket is already closed.",
            'ephemeral': true
          });
        }
        try {
          await _0x425bc3.channel.permissionOverwrites.set([{
            'id': _0x425bc3.guild.roles.everyone.id,
            'deny': [PermissionFlagsBits.ViewChannel]
          }, {
            'id': _0x8d7379.supportRoleId,
            'allow': [PermissionFlagsBits.ViewChannel]
          }], "Closing ticket");
          console.log("Permissions should now be updated.");
          await db.set("tickets." + _0x53feee + ".status", "closed");
          const _0x28c303 = new ButtonBuilder().setCustomId("delete_ticket").setLabel("Delete Ticket").setStyle(ButtonStyle.Danger);
          const _0x5953dd = new ActionRowBuilder().addComponents(_0x28c303);
          const _0x22ebc8 = new EmbedBuilder().setColor(39423).setTitle("Ticket Closed").setDescription("This ticket has been closed. If you need further assistance, please open a new ticket.");
          await _0x425bc3.channel.send({
            'embeds': [_0x22ebc8],
            'components': [_0x5953dd]
          });
          await _0x425bc3.reply({
            'content': "The ticket has been closed.",
            'ephemeral': true
          });
        } catch (_0x3ea3a9) {
          console.error("Failed to close the ticket:", _0x3ea3a9);
          await _0x425bc3.reply({
            'content': "There was an error closing your ticket. Please try again later.",
            'ephemeral': true
          });
        }
      } else {
        if (_0x425bc3.customId === "delete_ticket") {
          const [_0x66c26b] = _0x425bc3.channel.name.split('-');
          const _0x29115c = _0x3b5e8f.ticketSettings.ticketGroups[_0x66c26b];
          const _0x474858 = _0x425bc3.member.permissions.has(PermissionFlagsBits.Administrator);
          const _0x2f4695 = _0x425bc3.member.roles.cache.has(_0x29115c.supportRoleId);
          if (!_0x474858 && !_0x2f4695) {
            return _0x425bc3.reply({
              'content': "You do not have permission to delete this ticket.",
              'ephemeral': true
            });
          }
          try {
            await _0x425bc3.reply({
              'content': "Deleting ticket in 5 seconds...",
              'ephemeral': true
            });
            setTimeout(async () => {
              try {
                const _0x1a68c2 = _0x425bc3.channel.name.split('-')[1];
                await db["delete"]("tickets." + _0x1a68c2);
                await _0x425bc3.channel["delete"]();
              } catch (_0x46593d) {
                console.error("Failed to delete the ticket after delay:", _0x46593d);
              }
            }, 5000);
          } catch (_0xd4ec55) {
            console.error("Failed to initiate ticket deletion:", _0xd4ec55);
            await _0x425bc3.followUp({
              'content': "There was an error deleting the ticket. Please try again later.",
              'ephemeral': true
            });
          }
        }
      }
    }
  }
});
client.login(token);
