# ava-bot
A Discord bot to chill in the Saxy Beast's server. Her name is Ava (after the AI in Ex Machina)

Check out <https://discord.js.org> for more information about the [node.js](https://nodejs.org/en/) module I used to make the bot. You can install it with `npm install --save discord.js`

With v1.2.0, I added voice channel functionality. To use this, you will need some additional packages. ffmpeg (to play the files) can be installed with `npm install ffmpeg-binaries` and an opus encoder can be installed with either `npm install opusscript` or `npm install node-opus`. Make sure to download the music file and direct the bot to the file. 

The `auth.json` file contains the access token for the bot as well as the bot's ID. Be careful with the bot's token and don't share it with anyone you don't trust (like the internet). You can find your bot's ID and access token [here](https://discordapp.com/developers/applications/me) 

The `bot.js` file is the main code for the bot, it logs the bot in, and checks for things like new members, posts from certain members, or messages that are commands for the bot (they start with `!`). 

You can run the bot either with the `botStart.bat` file or with the command `node bot.js`. The `.bat` file just contains that command. 

Have fun messing with the bot! 

--Jakob
