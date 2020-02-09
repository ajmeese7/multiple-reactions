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

    // IDEA: Make it so react command is in CLI so you can react on 
    // channels where you don't have the right to message
    var commandName = args[0];
    if (command === "set") {
        // Detects insufficient number of arguments
        if (args.length == 1) {
            console.log(`${prefix}set doesn't work that way! You need to include at least one reaction.`);
            return;
        }

        // Format the data to be acceptable for json-fs-store
        var newCommand = {
            id: commandName,
            reactions: generateReactionArray(args)
        }

        store.add(newCommand, function(err) {
            if (err) {
                console.error("Problem saving new command:", err);
            } else {
                console.log(`Set ${prefix}${commandName}!`);
            }
        });
    } else if (command === "delete") {
        store.remove(commandName, function(err) {
            if (err) {
                console.error("[ERROR] Problem removing command! Are you sure it exists? Make sure you didn't make any typos...");
            } else {
                console.log("Successfully deleted command!");
            }
        });
    } else if (command === "list") {
        store.list(function(err, objects) {
            if (err) {
                console.error("[ERROR] Problem reading file system:", err);
            } else {
                // objects is an array of JS objects sorted by name, one per JSON file
                console.log(objects);
            }
        });
    } else {
        store.load(command, function(err, json) {
            if (err) {
                // JSON failed to parse
                console.error("Problem loading command:", err);
            } else {
                console.log(`Running ${prefix}${command}...`);
                reactEmojis(message, json);
            }
        });
    }
});

/**
 * Iterates over arguments passed and turns that into a list of
 * reactions that will be sent when the command is called.
 * @param {array} args - array of arguments passed from CLI
 * @returns {array} array of reaction emojis
 */
function generateReactionArray(args) {
    // Get reactions from arguments after `/set {commandName}`
    var reactionArray = [];
    for (i = 1; i < args.length; i++) {
        // Gets the ID, not just the emoji
        var emojiCode = "\\" + args[i];
        
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
 * async function to allow waiting for each emoji to react
 * so they are done in order.
 * @param {object} message - gives ability to send messages and
 * reactions in the chat.
 * @param {object} json - contains the contents of the command's JSON file.
 * They have already been parsed into a JavaScript object.
 */
async function reactEmojis(message, json) {
	// Actually add the reactions to the previous message
    var reactions = json.reactions;
    for (i = 0; i < reactions.length; i++) {
        var serverReaction = message.guild.emojis.get(reactions[i]);
        
        if (serverReaction || reactions[i].length < 8) {
            // TODO: Make sure it's added to another message, not ours
            
            // Server-wide emoji or Discord native emoji
            await previousMessage.react("" + reactions[i]);
            //await message.channel.send("+" + reactions[i]);
            //await message.channel.send("+" + serverReaction);
        } else {
            console.log("Emoji not available...");
        }

        // TODO: Add support for this next
        // If not, checks if the emoji is available to you because of Discord Nitro
        // reaction = client.emojis.get(reactions[i]);
        // reaction ? message.react("" + reactions[i]) : console.log("Emoji not available on server or your client..."); 
    }
}

client.login(config.botToken);
