const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
var general = "331122479022080001"
var ccbotlog = "369208528339992576"
client.on('ready',() => {
	console.log('Corner Cafe Bot Online');
	client.user.setGame("Type -help for help!")
});

client.on('guildBanAdd',(guild,user) => {
	guild.channels.get(general).send(`:hammer: The ban hammer has just been dropped onto ${user.username} :hammer:`)
	guild.channels.get(ccbotlog).send(`:hammer: The ban hammer has just been dropped onto ${user.username} :hammer:`)
})
client.on('guildBanRemove',(guild,user) => {
	guild.channels.get(ccbotlog).send(`${user.username} has just been unbanned!`)
})

client.on('messageUpdate', function(oldm,newm){
	if(oldm.content === newm.content) return;
  let ch = oldm.channel
	let guild = oldm.guild
	guild.channels.get(ccbotlog).send({embed: {
	    color: 3447003,
	    author: {
	      name: oldm.author.username,
	      icon_url: oldm.author.avatarURL
	    },
	    title: "Message Edited",
	    description: "**Message Update Logs**",
	    fields: [{
	        name: "Old Message",
	        value: ("Old Message: ***\"" + oldm + "\"***")
	      },
				{
		        name: "New Message",
		        value: ("New Message: ***\"" + newm + "\"***")
		      },
	      {
	        name: "Author",
	        value: ("Author: ***"+ oldm.author.username+"***")
	      },
	      {
	        name: "Channel",
	        value: ("Channel: "+ ch)
	      }
	    ],
	    timestamp: new Date(),
	    footer: {
	      icon_url: client.user.avatarURL,
	      text: "© Corner Cafe Bot Logs"
	    }
	  }
	});
})

client.on('messageDelete', function(m){
  let ch = m.channel
	let guild = ch.guild
	guild.channels.get(ccbotlog).send({embed: {
	    color: 3447003,
	    author: {
	      name: m.author.username,
	      icon_url: m.author.avatarURL
	    },
	    title: "Message Deleted",
	    description: "**Message Deleted Logs**",
	    fields: [{
	        name: "Message",
	        value: ("Message: ***\"" + m + "\"***")
	      },
	      {
	        name: "Author",
	        value: ("Author: ***"+ m.author.username+"***")
	      },
	      {
	        name: "Channel",
	        value: ("Channel: "+ ch)
	      }
	    ],
	    timestamp: new Date(),
	    footer: {
	      icon_url: client.user.avatarURL,
	      text: "© Corner Cafe Bot Logs"
	    }
	  }
	});
})
client.on('guildMemberAdd',member =>{
	let guild = member.guild;
	guild.channels.get(general).send(`Welcome, ${member.user.username} to Corner Cafe Official Discord! Have a good time here! :wink:`)
})
client.on('guildMemberRemove',member =>{
	let guild = member.guild;
	guild.channels.get(general).send(`Well, ${member.user.username} just left the Discord.. :sob:`)
})

var prefix = "-"
client.on('message', message => {
	let args = message.content.split(' ');
	var argsresult = args.join(' ');

if(!message.content.startsWith(prefix)) return;

if (message.author.bot) return;

if (message.channel.type === "dm"){
	message.channel.send("Please use commands in the Corner Cafe discord.")
	return};

if(message.content.startsWith(prefix+'ping')) {
  message.channel.send('Pinging!').then(m => m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`) );
} else
	if(message.content.startsWith(prefix + 'help')){
		message.reply('The help menu has been sent to your DM\'s, go check them!')
		message.author.send('Help menu:\n\n\n ***General Commands:***\n *-help*: Shows the help menu\n *-ping* Pong!\n *-urban*: Searches the Urban Dictionary **-urban [definition]**\n*-8ball*: Use the magical 8ball and ask a question! **-8ball [question]** \n\n\n***More lines coming soon!***')
	} else
	if(message.content.startsWith(prefix + 'urban')){
		let question = args[1];
		if(!question) return message.channel.send("You must provide something to search!")
		message.reply("The definition for, " + args[1] + ' is this: http://www.urbandictionary.com/define.php?term='+ args[1])
} else
if(message.content.startsWith(prefix + '8ball')){
	var answers = [
  'Maybe.', 'Certainly not.', 'I hope so.', 'Not in your wildest dreams.',
  'There is a good chance.', 'Quite likely.', 'I think so.', 'I hope not.',
  'I hope so.', 'Never!', 'Sorry, bucko.', 'Yes', 'No.', 'The future is bleak.',
  'The future is uncertain.', 'I would rather not say.', 'Who cares?',
  'Possibly.', 'Never, ever, ever.', 'There is a small chance.', 'Yes!'];

    let question = args[1];
    if(!question) return message.channel.send("You must provide a question!")
    var answer = answers[Math.floor(Math.random() * answers.length)];
    message.channel.send(answer);
}

});


client.login(process.env.BOT_TOKEN);
