module.exports = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['nome', 'email', 'senha', 'idade'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	if (!isValidOperation) {
		return res.status(400).json({ status: 'falha', error: 'Atualização inválida..' });
	}
	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));
		await req.user.save();
		res.status(200).json({ status: 'successo', user: req.user });
	} catch (error) {
		res.status(400).json({ status: 'falha', error });
	}
};
