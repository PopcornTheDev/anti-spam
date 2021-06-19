const config = require("../config.json");
const usersMap = new Map();

exports.run = async (client, message) => {
    if (message.author.bot) return;
    if (config["anti spam"].enabled === true) {
        if (usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            let msgCount1 = userData.msgCount;
            usersMap.set(message.author.id, {
                msgCount: msgCount1 + 1,
                lastMessage: message,
            });
            setTimeout(() => {
                const userData = usersMap.get(message.author.id);
                let msgCount1 = userData.msgCount;
                usersMap.set(message.author.id, {
                    msgCount: msgCount1 - 1,
                    lastMessage: message,
                });
            }, 5000);
            if (msgCount1 > config["anti spam"].limit) {
                message.delete()
                message.channel.send(`Stop refrain from spamming in this discord, It could result in a warn`).then(msg => {
                    setTimeout(() => {
                    msg.delete()    
                    }, 5000);
                })
            };
        } else {
            usersMap.set(message.author.id, {
                msgCount: 2,
                lastMessage: message,
            });
        }
    } else {

    }
};