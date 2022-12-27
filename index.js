const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, Events, GatewayIntentBits, Partials, TextChannel, } = require('discord.js');

const { userInfo } = require('node:os');

require('dotenv').config({

    path: __dirname + "/.env"
})

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages], partials: [Partials.Channel, Partials.message, 'CHANNEL',] });

client.commands = new Collection();

const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const filePath = path.join(commandPath, file);
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {

        client.commands.set(command.data.name, command)
    } else {

        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

/*client.on('messageCreate', async (message) => {

    if (message.author.bot) return;

    if (message.content === 'bom dia') {

        if (message.author.bot);

        if (message.channel.type == 'dm') return;

        await message.channel.send('bom dia meu consagrado')
    }



});*/

client.on("messageCreate", async message => {

    if (message.guild || message.author.bot) return;

    if (message.content === '') return;

    console.log(`alguém enviou uma mensagem por dm => ${message.content} de -- ${message.author.tag}`);

    await client.channels.cache.get('1055324201185202286').send(`**${message.content}** , enviado por : ${message.author.tag}`) //log

    await client.channels.cache.get('1055213758139609250').send(message.content) //sv de teste

    await client.channels.cache.get('1052913625112789043').send(message.content) //confessionario senryuu

    console.log(message.author.tag)

})


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {

        console.error(`nenhum comando correspondente  a ${interaction.commandName}`);
        return
    }

    try {
        await command.execute(interaction);
    } catch (error) {

        console.error(error);

        await interaction.reply({ content: 'existia um erro enquanto executava esse comando ', ephemeral: true });
    }

});



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});




client.login(process.env.DISCORD_TOKEN);



