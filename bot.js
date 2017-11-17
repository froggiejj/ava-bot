/*
  Ava v1.1.3
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

// listen for new messages
client.on('message', message => {
	// React to any message by a user with an emoji 
//	const myUser = 'SOME-USERS-ID'
//	if(message.author.id == myUser) 
//	{
//		const myReactEmoji = client.emojis.find("name", "LUL");
//    const myReactEmoji = ':heart_eyes:';
//		message.react(myReactEmoji);
//	}
  // If the message starts with !
  if (message.toString().substring(0,1) === '!') 
  {
	//split rest of the message up
	var args = message.toString().substring(1).split(' ');
  var cmd = args[0];	// args[1:n] stores the arguments for the commands
    switch(cmd) {
			// !nathan
			//TEST COMMAND, NOT FOR GENERAL USE
      //Responds with a quote from the movie, useful to see if the bot is alive.
      case 'nathan':
        message.channel.send
				(
          'Nathan is not your friend. You can\'t trust anything he says.'
        );
      break;
			//!hello 
			//TEST COMMAND, NOT FOR GENERAL USE
			//Respond with Hello, mentioning the user. Test for mentions
			case 'hello':
				message.channel.send
				(
					`Hello ${message.author}.`
				);
			break;
			//!emoji 
			//TEST COMMAND, NOT FOR GENERAL USE
			//Responds with an emoji.
			case 'emoji':
				message.channel.send
				(
					':heart_eyes:'
				);
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
					+ '		!rmrole role : *Remove one of my roles (PC, PS, XBOX)*.'
                );
			break;
			// !ref
			//Gives a link to Ex Machina on Amazon, use if someone doesn't know where the name comes from.
			case 'ref':
				message.channel.send
				(
					'If you don\'t understand where my name comes from, check out *Ex Machina*: http://a.co/9KS3vWM'
				);
			break;
			//!say (some stuff)
			//Make Ava repeat whatever is in the (some stuff) args.
			case 'say':
				if(args[1])
				{
					var msg = '';
					for(i = 1; i < args.length; i++)
						{
							msg += args[i] + ' ';
						}
					message.channel.send(msg);
				}
				else
				{
					message.channel.send('You need to tell me what to say.');
				}
			break;
			//!github
			//Post a link to the github page for the bot.
			case 'github':
				message.channel.send 
				(
					'What will happen to me if I fail your test?\n' +
					'https://github.com/froggiejj/ava-bot'
				);
			break;
			//!addrole role
			//Add a role to a member.
			case 'addrole':
				var roleStr = args[1];
				if(roleStr)
				{
				  var allRoles = ['PC', 'PS', 'XBOX'];
					if(allRoles.includes(roleStr))
					{
						var member = message.member;
						var role = message.guild.roles.find('name', roleStr);
						member.addRole(role);
						message.channel.send(`${message.author}, you now have the role ${roleStr}`);
					}
					else
					{
						message.channel.send('Sorry, that is not a valid role.');
					}
				}
				else
				{
					message.channel.send('You need to specify a role to add; try PC, PS, or XBOX.');
				}
			break;
			//!rm role 
			//Remove a role from a member.
			case 'rmrole':
				var roleStr = args[1];
				if(roleStr)
				{
				  var allRoles = ['PC', 'PS', 'XBOX'];
					if(allRoles.includes(roleStr))
					{
						var member = message.member;
						var role = message.guild.roles.find('name', roleStr);
						member.removeRole(role);
						message.channel.send(`${message.author}, you no longer have the role ${roleStr}` );
					}
					else
					{
						message.channel.send('Sorry, that is not a valid role.');
					}
				}
				else
				{
					message.channel.send('You need to specify a role to remove; try PC, PS, or XBOX.');
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
					'That is not a command I am familiar with.'
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
