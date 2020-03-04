const Joi = require('joi');
const routes = require('../../routes/web');

exports.routesList = (req, res, next) => {
	return res
		.status(200)
		.json({ status: 'success', msg: '', data: routes.routesList });
};

// validate
exports.validate = Joi.object().keys({});
exports.params = Joi.object().keys({});
