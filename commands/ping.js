const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Informa o ping do usuário'),
	async execute(message) {

		await message.reply(`🏓Latency is ${Date.now() - message.createdTimestamp}ms`);

		
	},
};