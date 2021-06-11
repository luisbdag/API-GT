const Tarefa = require('../../models/Tarefa');
module.exports = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['completa', 'descrição'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res
			.status(400)
			.json({ status: 'falha', error: 'Atualização inválida....!' });
	}
	try {
		const tarefa = await Tarefa.findOne({
			_id: req.params.id,
			owner: req.user._id
		});
		if (!tarefa) {
			return res.status(404).send();
		}
		updates.forEach((update) => (tarefa[update] = req.body[update]));
		await tarefa.save();
		res.status(200).json({ status: 'successo', tarefa });
	} catch (error) {
		res.status(400).json({ status: 'falha', error });
	}
};
