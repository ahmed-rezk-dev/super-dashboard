const _ = require('lodash');
const Joi = require('joi');
const Role = require('../../models/Role');
const Resource = require('../../models/Resource');

exports.index = (req, res, next) => {
	Role.find()
		.populate('resources')
		.exec((err, data) => {
			if (err) {
				return next(err);
			}
			return res.status(200).json({
				status: 'success',
				msg: '',
				data,
			});
		});
};

// Sotre
exports.store = (req, res, next) => {
	const newRole = new Role({
		name: req.body.name,
	});
	newRole.save((err, data) => {
		if (err && err.code === 11000) {
			return res.status(400).json({
				status: 'error',
				msg: 'This role is already exist!',
			});
		}
		if (err) return next(err);
		return res.status(200).json({
			status: 'success',
			data,
			msg: 'successfuly created',
		});
	});
};

// find
exports.find = ({ params }, res, next) => {
	Role.findByIdAndDelete(params.id, err => {
		if (err) {
			return next(err);
		}
		Resource.deleteMany(
			{
				role: params.id,
			},
			err => {
				if (err) {
					return next(err);
				}
			}
		);
	});
	return res.status(200).json({
		status: 'success',
		msg: 'Successfully deleted',
	});
};

// update
exports.update = ({ params, body }, res, next) => {
	const query = { _id: params.id };
	const update = { name: body.name };
	const options = { new: true };
	Role.findByIdAndUpdate(query, update, options, (err, doc) => {
		if (err) {
			if (err.kind === 'ObjectId') {
				return res.status(400).json({
					status: 'error',
					msg: `This id (${params.id}) is not exist.`,
				});
			}
			return next(err);
		}

		return res.status(200).json({
			status: 'success',
			msg: 'Successfully updated.',
			doc,
		});
	});
};

// delete
exports.delete = ({ params }, res, next) => {
	Role.findByIdAndDelete(params.id, err => {
		if (err) {
			return next(err);
		}
		Resource.deleteMany(
			{
				role: params.id,
			},
			err => {
				if (err) {
					return next(err);
				}
			}
		);
	});
	return res.status(200).json({
		status: 'success',
		msg: 'Successfully deleted',
	});
};

// validate
exports.validate = Joi.object({
	name: Joi.string().required(),
});
exports.params = Joi.object({
	id: Joi.string()
		.min(1)
		.required(),
});
