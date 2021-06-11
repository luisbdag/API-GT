module.exports = async (req, res) => {
	res.status(200).json({ status: 'successo', user: req.user });
};
