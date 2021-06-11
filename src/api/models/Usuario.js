const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./Tarefa');

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email inválido');
				}
			}
		},
		password: {
			type: String,
			required: true,
			minlength: 7,
			trim: true,
			validate(value) {
				if (value.toLowerCase().includes('password')) {
					throw new Error('A senha não pode conter "senha"');
				}
			}
		},
		age: {
			type: Number,
			default: 0,
			validate(value) {
				if (value < 0) {
					throw new Error('A idade deve ser um número positivo');
				}
			}
		},
		tokens: [
			{
				token: {
					type: String,
					required: true
				}
			}
		],
		avatar: {
			type: Buffer
		}
	},
	{
		timestamps: true
	}
);

userSchema.virtual('tarefas', {
	ref: 'Tarefa',
	localField: '_id',
	foreignField: 'proprietario'
});

userSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	delete userObject.password;
	delete userObject.tokens;
	delete userObject.__v;
	delete userObject.avatar;
	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const token = await jwt.sign(
		{ _id: this._id.toString() },
		process.env.JWT_SECRET_KEY
	);
	this.tokens = this.tokens.concat({ token });
	await this.save();
	return token;
};

userSchema.statics.findByLoginCredentials = async function (email, password) {
	const user = await this.findOne({ email });
	if (!user) {
		throw new Error('incapaz de realizar login');
	}
	const verifyPassword = await bcrypt.compare(password, user.password);
	if (!verifyPassword) {
		throw new Error('incapaz de realizar login');
	}
	return user;
};


userSchema.pre('salvar', async function (next) {
	if (this.isModified('senha')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});


userSchema.pre('remover', async function (next) {
	await Task.deleteMany({ owner: this._id });
	next();
});

module.exports = model('Usuario', userSchema);
