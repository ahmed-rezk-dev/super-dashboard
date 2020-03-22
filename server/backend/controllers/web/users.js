const Joi = require('joi');
const User = require('../../models/User');

exports.index = (req, res) => res.status(200).json('index');
exports.find = (req, res) => res.status(200).json('find');
exports.store = (req, res) => res.status(200).json('store');

// Update user
exports.update = ({ params, body, user }, res, next) => {
	User.findById(params.id, (findUserRrr, dbUser) => {
		// form body
		const {
			name,
			email,
			gender,
			address,
			pastcode,
			city,
			county,
			state,
			country,
		} = body;
		if (findUserRrr) {
			return next(findUserRrr);
		}
		if (user.email !== email) dbUser.emailVerified = false;

		// location
		const location = {
			address,
			pastcode,
			city,
			county,
			state,
			country,
		};
		dbUser.email = email || '';
		dbUser.profile.name = name || '';
		dbUser.profile.gender = gender || '';
		dbUser.profile.location = location || '';
		dbUser.save(err => {
			if (err) {
				if (err.code === 11000) {
					return res.status(400).json({
						status: 'error',
						msg:
							'The email address you have entered is already associated with an account.',
					});
				}
				return next(err);
			}
			return res.status(200).json({
				status: 'success',
				msg: 'Profile information has been updated.',
			});
		});
		return res.status(200).json('update');
	});
};

// Delete user
exports.delete = (req, res) => res.status(200).json('delete');

// Validate
exports.validate = Joi.object({
	name: Joi.string().required(),
	email: Joi.string()
		.email()
		.required(),
	gender: Joi.string().required(),
	address: Joi.string().required(),
	pastcode: Joi.number().required(),
	city: Joi.string().required(),
	county: Joi.string().required(),
	state: Joi.string().required(),
	country: Joi.string().required(),
});
exports.parms = Joi.object({
	id: Joi.string()
		.min(1)
		.required(),
});
