const Joi = require('joi');
const User = require('../../models/User');
const passportConfig = require('../../config/passport.js');

exports.index = (req, res) => res.status(200).json('index');
exports.find = (req, res) => res.status(200).json('find');
exports.store = (req, res) => res.status(200).json('store');

// Update user
exports.update = async ({ params, body, user }, res, next) => {
	// request body
	const {
		name,
		email,
		gender,
		lat,
		lng,
		address,
		postcode,
		city,
		county,
		state,
		country,
	} = body;
	const findUser = await User.findById(params.id)
		.populate({ path: 'role', populate: { path: 'resources' } })
		.exec();

	if (user.email !== email) findUser.emailVerified = false;

	// location
	const location = {
		lat,
		lng,
		address,
		postcode,
		city,
		county,
		state,
		country,
	};
	findUser.email = email;
	findUser.profile.name = name;
	findUser.profile.gender = gender;
	findUser.profile.location = location;

	const savedUser = await findUser.save().catch(err => {
		if (err.code === 11000) {
			return res.status(400).json({
				status: 'error',
				msg:
					'The email address you have entered is already associated with an account.',
			});
		}
		return next(err);
	});

	const [newToken, newRefreshToken] = passportConfig.createTokens(savedUser);
	return res.status(200).json({
		status: 'success',
		msg: 'Profile information has been updated.',
		token: newToken,
		refreshToken: newRefreshToken,
	});
};

// Delete user
exports.delete = (req, res) => res.status(200).json('delete');

// Update user avatar
exports.updateAvatar = async (req, res) => {
	const { params, file } = req;

	const findUser = await User.findById(params.id)
		.populate({ path: 'role', populate: { path: 'resources' } })
		.exec();

	const filepath = `pictures/${file.filename}`;
	findUser.profile.picture = filepath;

	const savedUser = await findUser.save();

	const [newToken, newRefreshToken] = passportConfig.createTokens(savedUser);
	return res.status(200).json({
		status: 'success',
		msg: 'Profile information has been updated.',
		token: newToken,
		refreshToken: newRefreshToken,
	});
};

/**
 * POST /change/password
 * Update current password.
 */
exports.postChangePassword = async (req, res) => {
	try {
		const findUser = await User.findById(req.user._id).exec();
		const comparePassword = await findUser.comparePasswordSync(
			req.body.old_password
		);
		if (comparePassword) {
			findUser.password = req.body.password;
			findUser.save();
			return res.status(200).json({
				status: 'success',
				msg: 'Success! Your password has been changed.',
			});
		}
	} catch (error) {
		console.error('error:', error);
	}
};

// Validate
exports.validate = Joi.object({
	name: Joi.string().required(),
	email: Joi.string()
		.email()
		.required(),
	gender: Joi.string().required(),
	lat: Joi.number().required(),
	lng: Joi.number().required(),
	address: Joi.string().required(),
	postcode: Joi.number().required(),
	city: Joi.string().required(),
	county: Joi.string().required(),
	state: Joi.string().required(),
	country: Joi.string().required(),
});
exports.changePasswordValidate = Joi.object({
	old_password: Joi.string().required(),
	password: Joi.string().strip(),
	confirm: Joi.string().strip(),
});
exports.params = Joi.object({
	id: Joi.string()
		.min(1)
		.required(),
});
