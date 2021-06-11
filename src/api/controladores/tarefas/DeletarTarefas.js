const Task = require('../../models/Tarefa');
module.exports = async (req, res) => {
	try {
		const tarefa = await Tarefa.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id
		});
		if (!tarefa) {
			return res.status(404).send();
		}
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ status: 'falha', error });
	}
};
