/*
  Ava v1.1.2
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

// Create an event listener for messages
client.on('message', message => {
  // If the message starts with !
  if (message.toString().substring(0,1) === '!') 
  {
	//split the message up
	var args = message.toString().substring(1).split(' ');
    var cmd = args[0];	// args[] stores the arguments for the commands
	
	var allRoles = ['PC', 'PS', 'XBOX'];
	
    switch(cmd) {
			// !cmd
			case 'cmd':
                message.channel.send 
				(
					'Hello '+ message.author + '. These are some things I can do. \n'
					+ '		!nathan : *We trust Nathan, right?* \n'
					+ '		!ref : *Where did Ava come from?*\n'
					+ '		!say : *Can you talk?*\n'
					+ '		!git : *What are you?*\n'
					+ '		!addrole role : *Give myself a role (PC, PS4, XBONE)*.\n'
					+ '		!rmrole role : *Remove one of my roles (PC, PS4, XBONE)*.'
                );
			break;
			// !ref
			case 'ref':
				message.channel.send
				(
					'If you don\'t understand where my name comes from, check out *Ex Machina*: http://a.co/9KS3vWM'
				);
			break;
            // !nathan
            case 'nathan':
                message.channel.send
				(
                    'Nathan is not your friend. You can\'t trust anything he says.'
                );
            break;
			//!hello 
			case 'hello':
				message.channel.send
				(
					' Hello '+ message.author + '.'
				);
			break;
			//!say (some stuff)
			case 'say':
				var msg = '';
				for(i = 1; i < args.length; i++)
					{
						msg += args[i] + ' ';
					}
				message.channel.send(msg);
			break;
			case 'git':
				message.channel.send 
				(
					'What will happen to me if I fail your test?\n' +
					'https://github.com/froggiejj/ava-bot'
				)
			break;
			//!addrole role
			case 'addrole':
				var roleStr = args[1];
				if(roleStr)
				{
					if(allRoles.includes(roleStr))
					{
						var member = message.member;
						var role = message.guild.roles.find('name', roleStr);
						member.addRole(role);
						message.channel.send(message.author + ', you now have the role ' + roleStr );
					}
					else
					{
						message.channel.send('Sorry, that is not a valid role');
					}
				}
				else
				{
					message.channel.send('You need to specify a role to add; try PC, PS, or XBOX')
				}
			break;
			//!rm role
			case 'rmrole':
				var roleStr = args[1];
				if(roleStr)
				{
					if(allRoles.includes(roleStr))
					{
						var member = message.member;
						var role = message.guild.roles.find('name', roleStr);
						member.removeRole(role);
						message.channel.send(message.author + ', you no longer have the role ' + roleStr );
					}
					else
					{
						message.channel.send('Sorry, that is not a valid role');
					}
				}
				else
				{
					message.channel.send('You need to specify a role to remove; try PC, PS, or XBOX')
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
	  message.channel.send( 'Hello ' + message.author + '.' );
	  message.channel.send( 'Try !cmd to see what I can do.' );
  }
});

// Log our bot in
client.login(token);
