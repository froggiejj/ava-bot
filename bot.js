/*
  Ava v1.2.0
  A bot to chill in the Saxy Beast's Discord server. 
  Built with discord.js
*/

// Import the discord.js module
const Discord = require('discord.js');
const auth = require("./auth.json");

const client = new Discord.Client();
const token = auth.token;

client.on('ready', () => {
  console.log('Hello.');
});

// Declare functions to run on commands
function sendEmoji(msg, args)
{
	if(args[1])
	{
		try 
		{
			const myEmoji = client.emojis.find("name", args[1]);
			msg.channel.send(myEmoji.toString());
		}
		catch(err)  
		{
			msg.channel.send(`:${args[1]}:`);
		}
	}
	else
	{
		const myEmoji = client.emojis.find("name", "LUL");
		msg.channel.send(myEmoji.toString());
	}
}

function say(msg, args)
{
	if(args[1])
	{
		var toSay = '';
		for(i = 1; i < args.length; i++)
			{
				toSay += args[i] + ' ';
			}
		msg.channel.send(toSay);
		msg.delete();
	}
	else
	{
		msg.channel.send('You need to tell me what I should say.');
	}
}

function addRole(msg, args)
{
	var roleStr = args[1];
	if(roleStr)
	{
	  var allRoles = ['PC', 'PS', 'XBOX'];
		if(allRoles.includes(roleStr))
		{
			var member = msg.member;
			var role = msg.guild.roles.find('name', roleStr);
			member.addRole(role);
			msg.channel.send(`${msg.author}, you now have the role ${roleStr}`);
		}
		else
		{
			msg.channel.send('Sorry, that is not a valid role.');
		}
	}
	else
	{
		msg.channel.send('You need to specify a role to add; try PC, PS, or XBOX.');
	}
}

function rmRole(msg, args)
{
	var roleStr = args[1];
	if(roleStr)
	{
	  var allRoles = ['PC', 'PS', 'XBOX'];
		if(allRoles.includes(roleStr))
		{
			var member = msg.member;
			var role = msg.guild.roles.find('name', roleStr);
			member.removeRole(role);
			msg.channel.send(`${msg.author}, you no longer have the role ${roleStr}` );
		}
		else
		{
			msg.channel.send('Sorry, that is not a valid role.');
		}
	}
	else
	{
		msg.channel.send('You need to specify a role to remove; try PC, PS, or XBOX.');
	}
}

function dance(msg)
{
	if(msg.member.voiceChannel)
	{
		msg.member.voiceChannel.join()
		.then(connection => {
			msg.channel.send('I\'m gonna tear up the fuckin\' dance floor');
			
			dispatcher = connection.playFile('./GetDownSaturdayNight.mp3');
			
			dispatcher.on('end', () => {
			connection.disconnect();
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
  if (message.toString().substring(0,1) === '!') 
  {
	//split rest of the message up
	var args = message.toString().substring(1).split(' ');
	var cmd = args[0];	// args[1:n] stores the arguments for the commands
    switch(cmd) 
	{
		//!nathan
		//TEST COMMAND, NOT FOR GENERAL USE
		//Responds with a quote from the movie, useful to see if the bot is alive.
		case 'nathan':
		message.channel.send('Nathan isn\'t your friend. You shouldn\'t trust anything he says.');
		break;
		
		//!hello 
		//TEST COMMAND, NOT FOR GENERAL USE
		//Respond with Hello, mentioning the user. Test for mentions
		case 'hello':
			message.channel.send(`Hello ${message.author}.`);
		break;
		
		//!emoji 
		//TEST COMMAND, NOT FOR GENERAL USE
		//Responds with an emoji.
		case 'emoji':
		  sendEmoji(message, args);
		break;
		
		// !cmd
		//Lists the available commands.
		case 'cmd':
               message.channel.send 
			(
				`Hello ${message.author}. These are some things I can do. \n`
				+ '		!ref : *Where did Ava come from?*\n'
				+ '		!say : *Can you talk?*\n'
				+ '		!github : *What are you?*\n'
				+ '		!addrole role : *Give myself a role (PC, PS, XBOX)*.\n'
				+ '		!rmrole role : *Remove one of my roles (PC, PS, XBOX)*.\n'
				+ '		!dance : *You wouldn\'t be wasting your if you were dancing with her*'
			);
		break;
		// !ref
		//Gives a link to Ex Machina on Amazon, use if someone doesn't know where the name comes from.
		case 'ref':
			message.channel.send('If you don\'t understand where my name comes from, check out *Ex Machina*: http://a.co/9KS3vWM');
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
		case 'dance':
			dance(message);
		break;
		case 'end':
			if(dispatcher != null)
			{
				dispatcher.end();
				dispatcher = null;
			}
		break;
		/*
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
	channel.send(`Welcome to the Saxy Beasts, ${member}\n` + 'I am here to help, type !cmd for more info.');
});

// Log Ava in
client.login(token);
