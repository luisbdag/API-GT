const Task = require('../../models/Tarefa');
module.exports = async (req, res) => {
	const _id = req.params.id;
	try {
		const tarefa = await Task.findOne({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		res.status(200).json({ status: 'successo', task });
	} catch (error) {
		res.status(500).json({ status: 'falha', error });
	}
};
