<p align="center">
  <h1 align="center">🤯Multiple Reactions🤯</h1>
</p>

<p align="center">
  <a href="https://github.com/ajmeese7/multiple-reactions/search?l=javascript">
    <img src="https://img.shields.io/badge/language-javascript-blue?color=FF69B4" alt="JavaScript" />
  </a>
  <a href="https://github.com/ajmeese7/multiple-reactions/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/ajmeese7/multiple-reactions" alt="License" />
  </a>
  <a href="https://github.com/ajmeese7/multiple-reactions/stargazers">
    <img src="https://img.shields.io/github/stars/ajmeese7/multiple-reactions" alt="Stars" />
  </a>
  <a href="https://github.com/ajmeese7/multiple-reactions/network/members">
    <img src="https://img.shields.io/github/forks/ajmeese7/multiple-reactions" alt="Forks" />
  </a>
  <a href="https://github.com/ajmeese7/multiple-reactions/stargazers">
    <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=If%20Useful&style=style=flat&color=BC4E99" alt="Leave a Star!"/>
  </a>
</p>

<p align="center">
  <img alt="Multiple reactions usage GIF" src="https://user-images.githubusercontent.com/17814535/74597447-521f0c80-5025-11ea-89d5-a6cb98e4e329.gif">
</p>

This is the cousin of my most popular repository, [spambot](https://github.com/ajmeese7/spambot).

This one also spams, but in a much more reasonable way. I don't know about you, but in all the Discord
servers I'm in, when someone sends messages that piss people off they show their annoyance with 
reactions. This project not only encourages that healthy way of expressing yourself, it also enables
you to save a lot of time when doing it.

Before you ask, **yes**, it works with custom animated server emojis. Not only that, it *also* allows you to use emojis from
other servers if you're a Nitro subscriber. So stop wasting time and start reacting!

**Please** don't be that guy who starts trying to set everything in a channel that everyone 
uses. Try to create the reaction sequences somewhere where it won't bother people, then once 
they're made you can use the custom commands to spam reactions without fear because the 
messages delete themselves. You give the command and *poof*, it's like it never happened.

A few additional points users have raised:
- No, you cannot use this on your phone. I'll eventually look into making that possible, but it is currently outside of the scope of this project.
- You can still only react with each emoji once. The normal rules of reactions apply.
- I'm pretty sure it only works on servers, not DMs or group chats. I'm willing to work on that in the future if there is enough interest.

**Note:** Using a selfbot may violate the [Discord terms of service](https://discordapp.com/terms). 
If you use this, your  account could be shut down. I claim no responsibility if this happens to you. 
You have been warned.

## Downloading

In a command prompt in your projects folder (wherever that may be), run the following:

`git clone https://github.com/ajmeese7/multiple-reactions`

Also note that this will not work if you are running discord.js 11.6.3 or higher.
To install the newest version of discord.js that this will work on, run the following in command prompt:

`npm install discord.js@11.6.2`

Once finished:

- Ensure you have NodeJS installed on your PC by running `npm`. If not, Google how to install it and do that now
- In the folder from where you ran the git command, run `cd multiple-reactions` and then run `npm install`
- Edit `config.json` and enter your token and desired prefix. It should look like this afterwards:

```json
{
  "botToken": "YOUR_TOKEN_HERE",
  "prefix": "YOUR_DESIRED_PREFIX_HERE"
}
```

Your prefix can be anything you want, but I tend to use the `/` because you're unlikely to ever use it on accident.

## Getting your login token

Go to [this link](https://github.com/Tyrrrz/DiscordChatExporter/wiki/Troubleshooting#my-token-is-disappearing-too-quickly-i-cant-copy-it) and follow the instructions
to get your login token.

> **KEEP YOUR TOKEN SECRET, AND NEVER SHARE IT WITH ANYONE**

## Controlling the bot

To start the bot, open a command prompt from the folder containing the repository and run:

 `node reactions`

To stop it, click on the terminal and press **CTRL+C**, which will kill the process. Clicking the big red x works just as well.

## Commands

The current supported commands are the following:

| Command | Arguments | Action |
|---------|---------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| set | `name` - the name of the reaction chain you want to create. <br> `emojis` - as many emojis as you want to chain. At least one is required. | Creates and stores a JSON file with the emojis you want to react with and the name you choose. If the name already exists, it will overwrite the previous save. |
| delete | `name` - the name of the reaction chain you want to delete. | Sends the specified command file to the recycling bin of your computer. |
| list | n/a | Sends an embedded message to the chat with all your current emoji reaction sequences listed in a pretty display. |

## TODO

- I'm thinking about adding in channel specific support for the custom commands, ex `/happy @ajmeese7 #general`
- Option to specify how many messages ago, like the second to last message the user sent
- Option to specify a channel for this, ex. last message by user in announcements
- Option for this to be either in the server or in the current channel. *(currently server)
- Properly implement the handling of reacting when the last sent message by that
user was deleted
- Fix the `Cannot read property 'react' of null` error
