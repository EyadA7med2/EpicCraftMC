const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`BoardCast Is On`);
});

client.on('ready', () => {
    client.user.setGame(`EpicCraftMC Community`, "http://twitch.tv/Streammingg")    
});


client.on('message',message =>{
    var prefix = "!";
      if(message.content.startsWith(prefix + 'bc')) {
    if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
  if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
    let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
    let copy = "EpicCraftMC";
    let request = `Requested By ${message.author.username}`;
    if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
    msg.react('✅')
    .then(() => msg.react('❌'))
    .then(() =>msg.react('✅'))
    
    let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
    let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
    
    let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
    let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
 reaction1.on("collect", r => {
    message.channel.send(`**☑ | Done ... The Broadcast Message Has Been Sent For __${message.guild.members.size}__ Members**`).then(m => m.delete(5000));
    message.guild.members.forEach(m => {
  
  var bc = new
       Discord.RichEmbed()
       .setColor('RANDOM')
       .setTitle('Broadcast')
       .addField('سيرفر', message.guild.name)
       .addField('المرسل', message.author.username)
       .addField('الرسالة', args)
       .setThumbnail(message.author.avatarURL)
       .setFooter(copy, client.user.avatarURL);
    m.send({ embed: bc })
    msg.delete();
    })
    })
    reaction2.on("collect", r => {
    message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
    msg.delete();
    })
    })
    }
    });

var client = new Discord.Client();

client.on("message", async msg => {

    if (msg.channel.type !== "text") return undefined;

    if (msg.auhtor.bot) return undefined;

    var args = msg.content.split(" ")

    var prefix = "!"

    if (msg.content.toLowerCase().startsWith(prefix + "purge")) {

    if(!msg.guild.members.get(msg.author.id).hasPermission("MANAGE_MESSAGES")) return msg.channel.send("You lack permissions.")

    if(!msg.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) return msg.channel.send("I lack permissions.")

    if (!args[1]) return msg.channel.send("DiscordAPI Err : Missing args.")

    var count = parseInt(args[1]);

    var fetched = msg.channel.fetchMessages({limit : count})

    if (isNaN(count)) return msg.channel.send("DiscordAPI Err : Only numbers are allowed.")

    if (count < 0) return msg.channel.send("DiscordAPI Err : Unvalid numbers.")

    if (count == 0) return msg.channel.send("DiscordAPI Err : 0 messages ???")

    if (count > 100) return msg.channel.send(`DiscordAPI Err : cannot delete ${args[1]} message..`)

    if (fetched.length == 0) return msg.channel.send(`DiscordAPI Err : ${msg.channel.name} is empty..`)

    else {
    try {
        fetched.then(async msgs => {
          await msg.channel.bulkDelete(msgs)
          await msg.channel.send(`Bulked ${msgs.size-=1} message.`).then(msg => {
            msg.delete(4000)
          })
        })
    } catch (e) {
      console.log(e.stack)
    }
    }
  }
})












client.login(process.env.Epic);
