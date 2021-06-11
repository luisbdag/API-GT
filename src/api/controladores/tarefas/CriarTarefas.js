const Task = require('../../models/Tarefa');
module.exports = async (req, res) => {
	try {
		const tarefa = new Tarefa({
			...req.body,
			owner: req.user._id
		});
		await tarefa.save();
		res.status(201).json({ status: 'sucesso', tarefa });
	} catch (error) {
		res.status(400).json({ status: 'falha', error });
	}
};
