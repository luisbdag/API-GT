const sgMail = require('@enviar/email');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmailMessage = async (email, name) => {
	try {
		await sgMail.send({
			to: email,
			from: 'luis.eduardosouza@outlook.com',
			subject: 'Obrigado por usar a nossa plataforma!',
			text: `Bem vindo, ${name}. Me deixei saber como você se dá com o aplicativo.`
		});
	} catch (error) {
		console.error(error);
	}
};

const sendCancelationEmailMessage = async (email, name) => {
	try {
		await sgMail.send({
			to: email,
			from: 'noreply@luis.dev',
			subject: `Sinto muito que esteja indo!`,
			text: `Até mais, ${name}. Eu espero ve-lo em breve.`
		});
	} catch (error) {
		console.error(error);
	}
};

module.exports = { sendWelcomeEmailMessage, sendCancelationEmailMessage };
