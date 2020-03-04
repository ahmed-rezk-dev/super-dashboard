const _ = require('lodash');
const { body, validationResult } = require('express-validator');

const customValidationResult = validationResult.withDefaults({
	formatter: error => {
		return {
			[error.param]: error.msg,
		};
	},
});

exports.index = (req, res, next) => {
	return res.status(200).json({ status: 'success', msg: 'index' });
};

// Sotre
exports.store = (req, res, next) => {
	const errors = customValidationResult(req);
	console.log('res', errors.isEmpty());
	return res.status(200).json({ status: 'success', msg: errors.array() });
};

// find
exports.find = (req, res, next) => {};

// update
exports.update = (req, res, next) => {};

// delete
exports.delete = (req, res, next) => {};

// validate
exports.validate = method => {
	switch (method) {
		case 'store': {
			return [
				body('name', 'name is required')
					.not()
					.isEmpty(),
			];
		}
		default:
	}
};
