var SlackBot = require('slackbots');
var natural = require('./natural');

const envKey: string = process.env.MONOBOT_TOKEN;

// create a bot
var bot = new SlackBot({
  token: envKey, // Add a bot https://my.slack.com/services/new/bot and put the token
  name: 'monobot'
});

bot.on('start', function(): void {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  var params = {
    icon_emoji: ':speak_no_evil:'
  };

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  bot.postMessageToChannel('general', 'uh! uh! Estoy listo!', params);

  let val = natural.talk();
  console.log(val);

  // define existing username instead of 'user_name'
  bot.postMessageToUser('user_name', 'uh! uh! uh!', params);

  // If you add a 'slackbot' property,
  // you will post to another user's slackbot channel instead of a direct message
  bot.postMessageToUser('user_name', 'uh! uh! uh!', {
    slackbot: true,
    icon_emoji: ':speak_no_evil:'
  });

  // define private group instead of 'private_group', where bot exist
  bot.postMessageToGroup('private_group', 'uh! uh! uh!', params);

  //the fun begins...

  bot.on('message', msg => {
    switch (msg.type) {
      case 'message':
        if (msg.channel[0] === 'D' && msg.bot_id === undefined) {
          let text = msg.text.toLowerCase();

          switch (true) {
            case text.includes('hola'):
              bot.postMessage(msg.user, 'hola po', { as_user: true });
              break;
            case text.includes('chao'):
              bot.postMessage(msg.user, 'chao po!', { as_user: true });
              break;
            case text.includes('cuando pagan'):
              bot.postMessage(
                msg.user,
                'El último día habil del mes po, supongo.',
                { as_user: true }
              );
              break;

          }
        }
        break;
    }
  });
});
