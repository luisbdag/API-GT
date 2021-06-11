const jwt = require('jsonwebtoken');
const User = require('../models/Usuario');

const auth = async (req, res, next) => {
	try {
		const tokenProvidedByUser = req
			.header('Autorização')
			.replace('Portador ', '');
		const decode = jwt.verify(tokenProvidedByUser, process.env.JWT_SECRET_KEY);
		const user = await User.findOne({
			_id: decode._id,
			'tokens.token': tokenProvidedByUser
		});
		if (!user) {
			throw new Error();
		}
		req.token = tokenProvidedByUser;
		req.user = user;
		next();
	} catch (e) {
		res.status(401).json({ status: 'falha', error: 'Autenticação necessária.' });
	}
};

module.exports = auth;
