const Joi = require('joi');
const User = require('../../models/User');

exports.index = (req, res) => res.status(200).json('index');
exports.find = (req, res) => res.status(200).json('find');
exports.store = (req, res) => res.status(200).json('store');

// Update user
exports.update = ({ params, body }, res) => {
	const query = { _id: params.id };
	console.log('req.user', req.user);
	User.findById(req.user.id, (err, user) => {
		if (err) {
			return next(err);
		}
		if (user.email !== req.body.email) user.emailVerified = false;
		user.email = req.body.email || '';
		user.profile.name = req.body.name || '';
		user.profile.gender = req.body.gender || '';
		user.profile.location = req.body.location || '';
		user.profile.website = req.body.website || '';
		user.save(err => {
			if (err) {
				if (err.code === 11000) {
					req.flash('errors', {
						msg:
							'The email address you have entered is already associated with an account.',
					});
					return res.redirect('/account');
				}
				return next(err);
			}
			req.flash('success', { msg: 'Profile information has been updated.' });
			res.redirect('/account');
		});
	});
	return res.status(200).json('update');
};

// Delete user
exports.delete = (req, res) => res.status(200).json('delete');

// Validate
exports.validate = Joi.object({
	email: Joi.string().required(),
});
exports.parms = Joi.object({
	id: Joi.string()
		.min(1)
		.required(),
});
