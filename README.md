# multiple-reactions
This is the cousin of my most popular repository, [spambot](https://github.com/ajmeese7/spambot).

![Spambot Usage GIF](https://user-images.githubusercontent.com/17814535/74597447-521f0c80-5025-11ea-89d5-a6cb98e4e329.gif)

This one also spams, but in a much more reasonable way. I don't know about you, but in all the Discord
servers I'm in, when someone sends messages that piss people off they show their annoyance with 
reactions. This program not only encourages that healthy way of expressing yourself, it also enables
you to save a lot of time when doing it.

Before you ask, **yes**, it works with custom animated server emojis. It doesn't support your own custom emojis for
Nitro users yet, but that should be coming soon.

**Please** don't be that guy who starts trying to set everything in a channel that everyone uses. Try to create the reaction
sequences somewhere where it won't bother people, then once they're made you can use the custom commands to spam reactions
without fear because the messages delete themselves. You give the command and *poof*, it's like it never happened.

**Note:** Using a selfbot may violate the [Discord terms of service](https://discordapp.com/terms). If you use this, your 
account could be shut down. I claim no responsibility if this happens to you. You have been warned.

## Downloading

In a command prompt in your projects folder (wherever that may be), run the following:

`git clone https://github.com/ajmeese7/multiple-reactions`

Once finished:

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

0. Open either the web application or the installed Discord app
1. Use the **CTRL+SHIFT+I** keyboard shortcut.
2. This brings up the **Developer Tools**. Go to the **Application** tab
3. On the left, expand **Local Storage**, then click on the discordapp.com entry (it should be the only one).
4. Locate the entry called `token`, and copy it.

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

- I am still working on getting it to support custom user emojis for Discord Nitro users.
- I'm thinking about adding in channel specific support for the custom commands, ex `/happy @ajmeese7 #general`.
- I want to add a setting that lets you choose whether it's the last message the user sent in the 
server that's reacted to or just in the channel where you are currently messaging.
