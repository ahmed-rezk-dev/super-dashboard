const Joi = require('joi');

const validate = (schema, property) => {
	return (req, res, next) => {
		const { error } = Joi.validate(req[property], schema, {
			abortEarly: false,
		});
		const valid = error == null;

		if (valid) {
			next();
		} else {
			const { details } = error;
			const messages = {};
			details.forEach(item => {
				messages[item.context.key] = item.message;
			});

			return res.status(422).json({ status: 'inputsError', errors: messages });
		}
	};
};

module.exports = validate;
