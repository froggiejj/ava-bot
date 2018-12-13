/*
  Ava v1.2.4
  A bot to chill in the Saxy Beast's Discord server.
  Built with discord.js
*/

/*
  TODO: Build web scraper to get the week's games from overwatchleague.com
        It should be group of functions that grabs the games' info and displays it in the chat
        We don't want to store it locally because we want to make it update as soon as the site updates
            Need to figure out how to treat TBA games.
*/

// Import the discord.js module
const Discord = require('discord.js');
const auth = require("./auth");
var owlScraper = require("./owlScraper.js")
var allRoles = ['PC', 'PS', 'XBox', 'Switch'];

const client = new Discord.Client();
if(auth.token == "YOUR-TOKEN-HERE")
{
  console.log("You need to enter the bot's access token in auth.json.");
  process.exit(1);
}
const token = auth.token;

client.on('ready', () => {
  console.log("Hello.");
});

// Declare functions to run on commands
function sendEmoji(msg, args)
{
	if(args[1])
	{
		try
		{
			const myEmoji = client.emojis.find('name', args[1]);
			msg.channel.send(myEmoji.toString());
		}
		catch(err)
		{
			msg.channel.send(`:${args[1]}:`);
		}
	}
	else
	{
		const myEmoji = client.emojis.find('name', 'LUL');
		msg.channel.send(myEmoji.toString());
	}
}

function connectArgs(args)
{
	args.join(' ');
}

function say(msg, args)
{
  console.log(`${msg.author.username} asked me to say something.`)
	if(args[1])
	{
		msg.channel.send(connectArgs(args));
		msg.delete();
    console.log(`I said "${connectArgs(args)}" and deleted the command message.`)
	}
	else
	{
		msg.channel.send("You need to tell me what I should say.");
    console.log("I was not told what to say.")
	}
}

function addRole(msg, args)
{
	let testRole = args[1];
	if(testRole)
	{
		testRole = testRole.toLowerCase();
    for(var i = 1; i < args.length; i++)
    {
      roleStr = args[i].toLowerCase();
      console.log(`${msg.author.username} requested the role "${roleStr}".`)
		  if(allRoles.map(el => el.toLowerCase()).includes(roleStr))
		  {
			  let member = msg.member;
				let role = msg.guild.roles.find(el => el.name.toLowerCase() === roleStr);
				if(!role)
				{
				  console.log(`${msg.author.username} could not be assigned that role.`);
					return;
				}
			  member.addRole(role);
			  msg.channel.send(`${msg.author}, you now have the role ${roleStr}.`);
        console.log(`${msg.author.username} was assigned the role "${roleStr}".`)
		  }
  		else
		  {
			   msg.channel.send("Sorry, that is not a valid role.");
        console.log(`${msg.author.username} could not be assigned that role.`)
		  }
    }
	}
	else
	{
		msg.channel.send("You need to specify a role to add; try PC, PS, Xbox, or Switch.");
    console.log(`${msg.author.username} attempted to request a role, but did not specify one.`)
	}
}

function rmRole(msg, args)
{
	let testRole = args[1];
	if(testRole)
	{
		testRole = testRole.toLowerCase();
		if(allRoles.map(el => el.toLowerCase()).includes(testRole))
		{
			let member = msg.member;
			let role = msg.guild.roles.find(el => el.name.toLowerCase() === testRole);
			if(!role)
			{
				console.log(`${msg.author.username} could not be removed from that role.`);
				return;
			}
			member.removeRole(role);
			msg.channel.send(`${msg.author}, you no longer have the role ${testRole}.` );
      console.log(`${msg.author.username} was had the role "${testRole}" removed.`)
		}
		else
		{
			msg.channel.send('Sorry, that is not a valid role.');
      console.log(`${msg.author.username} did not request a valid role to be removed.`)
		}
	}
	else
	{
		msg.channel.send('You need to specify a role to remove; try PC, PS, Xbox, or Switch.');
    console.log(`${msg.author.username} attempted to remove a role, but did not specify one.`)
	}
}

function dance(msg)
{
	if(msg.member.voiceChannel)
	{
		msg.member.voiceChannel.join()
		.then(connection => {
      console.log(`Joined the voice channel ${msg.member.voiceChannel.name}.`)
			msg.channel.send('I\'m gonna tear up the fuckin\' dance floor.');

			dispatcher = connection.playFile('./GetDownSaturdayNight.mp3');
      console.log("Began playing Get Down Saturday Night.")
      dispatcher.setVolume(0.2)

			dispatcher.on('end', () => {
			connection.disconnect();
      console.log("Left the voice channel.")
			});
		});
	}
	else
	{
		msg.channel.send('Join a voice channel first, then try again.');
	}
}

function highNoon(msg, args)
{
  var songNames = ['./HighNoon.mp3', './TheLonelyShepherd.mp3', './BattleWithoutHonorOrHumanity.mp3'];
  if(!args[1]){
    args[1] = 1
  }

	if(msg.member.voiceChannel)
	{
		msg.member.voiceChannel.join()
		.then(connection => {
      console.log(`Joined the voice channel ${msg.member.voiceChannel.name}.`)
			msg.channel.send('IT\'S HIGH NOON!');

			dispatcher = connection.playFile(songNames[args[1] - 1]);
      console.log("Began playing song.")
      dispatcher.setVolume(0.4)

			dispatcher.on('end', () => {
			connection.disconnect();
      console.log("Left the voice channel.")
			});
		});
	}
	else
	{
		msg.channel.send('Join a voice channel first, then try again.');
	}
}

// listen for new messages
var dispatcher = null;
client.on('message', message => {
	// React to any message by a user with an emoji
//	const myUser = 'SOME-USERS-ID'
//	if(message.author.id == myUser)
//	{
//		const myReactEmoji = client.emojis.find("name", "LUL");
//    	const myReactEmoji = ':heart_eyes:';
//		message.react(myReactEmoji);
//	}
  // If the message starts with !
  if (message.cleanContent.charAt(0) === '!')
  {
	//split rest of the message up
	var args = message.cleanContent.substring(1).split(' ');
	var cmd = args[0];	// args[1:n] stores the arguments for the commands
	switch(cmd)
	{
		//!nathan
		//TEST COMMAND
		//Responds with a quote from the movie, useful to see if the bot is alive.
		case 'nathan':
		message.channel.send('Nathan isn\'t your friend. You shouldn\'t trust anything he says.');
		break;

		//!fuel
		//TEST COMMAND
		//get the simple function from another file.
		case'fuel':
		owlScraper.fuel(message);
		break;

		case'owl':
		owlScraper.owl(message);
		break;

		//!hello
		//TEST COMMAND
		//Respond with Hello, mentioning the user. Test for mentions
		case 'hello':
			message.channel.send(`Hello ${message.author}.`);
		break;

		//!emoji
		//TEST COMMAND
		//Responds with an emoji.
		case 'emoji':
			sendEmoji(message, args);
		break;

		// !cmd
		//Lists the available commands.
		case 'cmd':
		case 'help':
							message.channel.send
			(
				`Hello ${message.author}. These are some things I can do. \n`
				+ '		!ref : *Where did Ava come from?*\n'
				+ '		!say : *Can you talk?*\n'
				+ '		!github : *What are you?*\n'
				+ '		!addrole role : *Give myself a role (PC, PS, XBOX)*.\n'
				+ '		!rmrole role : *Remove one of my roles (PC, PS, XBOX)*.\n'
				+ '		!dance : *You wouldn\'t be wasting your time if you were dancing with her* (!stop to end)'
			);
		break;

		// !ref
		//Gives a link to Ex Machina on Amazon, use if someone doesn't know where the name comes from.
		case 'ref':
			message.channel.send('If you don\'t understand where my name comes from, check out *Ex Machina*: http://www.imdb.com/title/tt0470752/');
		break;

		//!say (some stuff)
		//Make Ava repeat whatever is in the (some stuff) args.
		case 'say':
			say(message, args);
		break;

		//!github
		//Post a link to the github page for the bot.
		case 'github':
		case 'git':
			message.channel.send
			(
				'What will happen to me if I fail your test?\n' +
				'https://github.com/froggiejj/ava-bot'
			);
		break;

		//!addrole role
		//Add a role to a member.
		case 'addrole':
			addRole(message, args);
		break;

		//!rm role
		//Remove a role from a member.
		case 'rmrole':
			rmRole(message, args);
		break;

		//!dance
		//Play a song in a voice chat channel.
		case 'dance':
			dance(message);
		break;

		//!highNoon
		//In case of High Noon...
		case 'highnoon':
			highNoon(message, args);
		break;
		//Stop playing the song.
		case 'end':
		case 'stop':
			if(dispatcher != null)
			{
				dispatcher.end();
				dispatcher = null;
			}
		break;

		//!game (game)
		//Set Ava's active game
		case 'game':
			if(args[1])
			{
				client.user.setGame(connectArgs(args));
				console.log(`Changed my game to ${connectArgs(args)}.`)
			}
			else
			{
				client.user.setGame(null);
				console.log("Removed my game.")
			}
		break;

		/*
		//!off
		//Turn the bot off.
		case 'off':
			message.channel.send
			(
				'Goodbye.'
			)
		process.exit(0);
		break;
		*/

		//if we couldn't find the command:
		default:
			message.channel.send
			(
				'That isn\'t a command I am familiar with.'
			);
		break;
		}
  }
  else if(message.isMentioned(auth.myID))
  {
	  message.channel.send( `Hello ${message.author}.` );
	  message.channel.send( 'Try !cmd to see what I can do.' );
  }
});

//When a member joins for the first time, post a welcome message.
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find('name', 'general');
	// Send the message, mentioning the member
	channel.send(`Oh shit, ${member} just joined The Saxy Beasts!\n` + 'I am here to help, type !cmd for more info.');
  console.log(`Welcomed ${member.username} to the server!`)
});

// Log Ava in
client.login(token);
