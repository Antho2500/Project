const fs=require("fs");
const Discord=require("discord.js");
const bot=new Discord.Client();
bot.login(process.env.TOKEN);
const rpchannels=["631904154662600720"];
var levels=JSON.parse(fs.readFileSync("levels.json","utf-8"));
bot.on("message",(msg)=>{
    let args=msg.content.split(" ").splice(1)
    if(msg.content=="!leaderboard") {
        levels.sort((a,b)=>{return b.xp-a.xp});let pos=levels.indexOf(levels.find(x=>x.id==msg.author.id));let begin=(isNaN(args[0])?0:Math.min(15*(args[0]-1),levels.length));let end=(isNaN(args[0])?Math.min(levels.length,15):Math.min(15*args[0],levels.length));let out="";for(i=begin;i<end;i++){out=out+(i+1)+". "+levels[i].xp+" - "+(bot.users.cache.get(levels[i])!==undefined?bot.users.cache.get(levels[i].id).username:"<@!"+levels[i].id+">")+"\n";};msg.channel.send({embed:{image:{url:"https://cdn.discordapp.com/attachments/701101262078214350/715569991608565760/3100530511_1_6_R2iXB9lE.gif"},color:150,fields:[{name:"Niveaux",value:"╔═✵══════════╗\n\nＣｌａｓｓｅｍｅｎｔ\n\n"+out+"\n╚══════════✵═╝"}],footer:{text:"Votre position : "+(pos+1)+"/"+levels.length+", affichage : "+(begin+1)+"-"+end+" sur "+levels.length+" ("+(isNaN(args[0])?"1":args[0])+"/"+Math.ceil(levels.length/15)+")"}}})
        }
    if (msg.content=="!rank" && levels.find(x=>x.id==msg.author.id)!=undefined) {
        levels.sort((a,b)=>{return b.xp-a.xp});let pos=levels.indexOf(levels.find(x=>x.id==msg.author.id));let begin=(isNaN(args[0])?0:Math.min(15*(args[0]-1),levels.length));let end=(isNaN(args[0])?Math.min(levels.length,15):Math.min(15*args[0],levels.length));let out="";for(i=begin;i<end;i++){out=out+(i+1)+". "+levels[i].xp+" - "+(bot.users.cache.get(levels[i])!==undefined?bot.users.cache.get(levels[i].id).username:"<@!"+levels[i].id+">")+"\n";};msg.channel.send({embed:{image:{url:"https://cdn.discordapp.com/attachments/701101262078214350/715569991608565760/3100530511_1_6_R2iXB9lE.gif"},color:150,fields:[{name:"Classement",value:out}],footer:{text:"Votre position : "+(pos+1)+"/"+levels.length+", affichage : "+(begin+1)+"-"+end+" sur "+levels.length+" ("+(isNaN(args[0])?"1":args[0])+"/"+Math.ceil(levels.length/15)+")"}}})
        }
    if (rpchannels.includes(msg.channel.parent.id) && msg.content.charAt(0)!="(") {
        let pos=levels.indexOf(levels.find(x=>x.id==msg.author.id));
        if (pos==-1) {
            levels.push({id:msg.author.id,xp:msg.content.length});
        } else {
            let lv=Math.floor((levels[pos].xp/5000)**(1/1.2))
if (lv!=Math.floor(((levels[pos].xp+msg.content.length)/5000)**(1/1.2))) {msg.author.send({embed:{fields:[{name:"Félicitations, tu es maintenant niveau "+(lv+1)+" !",value:"Tu as gagné "+(lv+1<46?Math.ceil((lv+1)/5)*25+25:300)+" points de stats"}]}})}
            levels[pos].xp+=msg.content.length;
        }
        fs.writeFile("levels.json",JSON.stringify(levels),(err)=>{if(err)throw err;});
    }
});
