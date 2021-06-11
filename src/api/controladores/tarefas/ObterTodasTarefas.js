module.exports = async (req, res) => {
	const match = {};
	const sort = {};

	if (req.query.completed) {
		match.completed = req.query.completed === 'true';
	}

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		if (parts[1].toUpperCase() === 'DESC') {
			sort[parts[0]] = -1;
		} else if (parts[1].toUpperCase() === 'ASC') {
			sort[parts[0]] = 1;
		} else {
			res.status(400).json({
				status: 'falha',
				error: 'Permitido apenas asc e desc para critérios de classificação'
			});
		}
	}
	try {
		await req.user
			.populate({
				path: 'tarefa',
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort
				}
			})
			.execPopulate();
		res.status(200).json({ status: 'successo', user: req.user.tasks });
	} catch (error) {
		res.status(500).json({ status: 'falha', error });
	}
};
