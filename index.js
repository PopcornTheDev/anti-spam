const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();


client.events = new Discord.Collection();



    fs.readdir('./events/', (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
            let eventFunc = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, (...args) => eventFunc.run(client, ...args));
        });
});








client.login(config.main.token)