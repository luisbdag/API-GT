const sharp = require('sharp');
const UploadAvatar = async (req, res) => {
	try {
		const modifyImageBuffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();
		req.user.avatar = modifyImageBuffer;
		await req.user.save();
		res.status(200).json({ status: 'successo' });
	} catch (error) {
		res.status(500).json({ status: 'falha', error });
	}
};

module.exports = UploadAvatar;
