const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
var store = require('json-fs-store')();
client.config = config;

client.once('ready', () => {
	console.log('Ready to react!');
});

const prefix = config.prefix;
client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Stop the program if the message wasn't sent by us or isn't prefaced with configured prefix
  if (message.author.id !== client.user.id || message.content.indexOf(client.config.prefix) !== 0) return;

  let commandName = args[0];
  if (command === "set") {
      // Detects insufficient number of arguments
      if (args.length == 1)
        return console.log(`${prefix}set doesn't work that way! You need to include at least one reaction.`);
      if (commandName == "set" || commandName == "delete" || commandName == "list")
        return console.log(`You can't use the name ${commandName}! That's already a command!`);

      // Format the data to be acceptable for json-fs-store
      let newCommand = {
        id: commandName,
        reactions: generateReactionArray(args)
      }

      store.add(newCommand, function(err) {
        if (err)
          return console.error("Problem saving new command:", err);
        console.log(`Set ${prefix}${commandName}!`);
      });
  } else if (command === "delete") {
      store.remove(commandName, function(err) {
        if (err)
          return console.error("[ERROR] Problem removing command! Are you sure it exists? Make sure you didn't make any typos...");
        console.log("Successfully deleted command!");
      });
  } else if (command === "list") {
    store.list(function(err, objects) {
      if (err)
        return console.error("[ERROR] Problem reading file system:", err);
      
      // NOTE: Skin colored emojis won't send; need to implement
      // a conversion to the yellow variant or something to show
      let reactionListEmbed = new Discord.RichEmbed()
        .setColor('#00ff80')
        .setTitle('multiple-reactions')
        .setURL('https://github.com/ajmeese7/multiple-reactions')
        // NOTE: Can change image size if higher quality desired
        .setAuthor('Aaron Meese', 'https://cdn.discordapp.com/avatars/344277309869522957/5f2b5d2522979cb93d29f78b84f2c8fa.png?size=128', 'https://github.com/ajmeese7')
        .setDescription('Here are all your saved reaction sequences:')
        //.setThumbnail('would need a good logo image here');

      // objects is an array of JS objects sorted by name, one per JSON file
      objects.forEach(function (reaction) {
        let emojis = reaction.reactions;
        emojis.forEach(function (emoji, index) {
          // If custom emoji, try to get it from the server or user.
          if (emoji.length > 2) {
            let serverEmoji = message.guild.emojis.get(emoji);
            let userEmoji = client.emojis.get(emoji);
            emojis[index] = !!serverEmoji ? serverEmoji : userEmoji;
            if (!emojis[index]) emojis[index] = "Not available";
          }
        });

        reactionListEmbed.addField(`${prefix}${reaction.id}:`, emojis, true);
      });

      reactionListEmbed
        .setTimestamp()
        .setFooter('If you like this, give us a star! 🙂');

      message.channel.send(reactionListEmbed);
    });
  } else {
    store.load(command, function(err, json) {
      // JSON failed to parse
      if (err) return console.error("Problem loading command:", err);

      console.log(`Running ${prefix}${command}...`);
      reactEmojis(message, json);
    });
  }
});

/**
 * Iterates over arguments passed and turns that into a list of
 * reactions that will be sent when the command is called.
 * @param {array} args - array of arguments passed from user
 * @returns {array} array of reaction emojis
 */
function generateReactionArray(args) {
  // Get reactions from arguments after `/set {commandName}`
  let reactionArray = [];
  for (i = 1; i < args.length; i++) {
    // Gets the ID, not just the emoji
    let emojiCode = "\\" + args[i];
    
    if (emojiCode.indexOf(':') != -1) {
      // Gets the emoji ID of custom emojis
      console.log("Gathering custom emoji ID...");
      emojiCode = emojiCode.split(':')[2];
      emojiCode = emojiCode.substring(0, emojiCode.length - 1);
    } else {
      // Remove the backslashes
      emojiCode = args[i];
    }

    // [i-1] to ignore the commandName and start at 0 for reactions
    reactionArray[i-1] = emojiCode;
  }

  return reactionArray;
}

/**
 * Async function to allow waiting for each emoji to react
 * so they are done in order.
 * 
 * @param {object} message - gives ability to send messages and
 * reactions in the chat.
 * @param {object} json - contains the contents of the command's JSON file.
 * They have already been parsed into a JavaScript object.
 */
async function reactEmojis(message, json) {
  // https://stackoverflow.com/a/51456169/6456163

  // The `Cannot read property 'react' of null` happens whenever
  // the user sends a message BEFORE the script is started, so is 
  // there any way to avoid that?
  let user = message.mentions.users.first();
  if (!user) return console.log("Specify a user!");

  // Deletes the command message
  message.member.lastMessage.delete().catch(console.error);
  
  // Actually add the reactions to the previous message
  let reactions = json.reactions;
  let breakLoop = false;
  for (let i = 0; i < reactions.length; i++) {
    if (breakLoop) break;
    let userReaction = client.emojis.get(reactions[i]);
    
    // Discord native emoji or server/Nitro
    if (reactions[i].length < 8 || userReaction) {
      try {
        // https://discordjs.guide/popular-topics/reactions.html#reacting-in-order
        await user.lastMessage.react(reactions[i]).catch(async function(err) {
          console.log("The last message that user sent was deleted! Cannot react...");
          breakLoop = true;
        });
      } catch {
        // Don't know why this has issues with bots, but that's a problem I have
        // observed very frequently.
        console.log("There was a problem reacting to that user. Are they a bot?");
        breakLoop = true;
      }
    } else {
      console.log("Emoji not available on server or your client..."); 
    }
  }
}

client.login(config.botToken);
