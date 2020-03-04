const Joi = require('joi');
const Resource = require('../../models/Resource');
const Role = require('../../models/Role');
const routes = require('../../routes/web');

exports.index = (req, res, next) => {
	console.log('routes', routes.routesList);
	return res.status(200).json({ status: 'success', msg: 'index' });
};

// Store
exports.store = (req, res, next) => {
	const { route, permissions, role } = req.body;
	const parsePermissions = JSON.parse(permissions);

	Role.findById(role, (err, getRole) => {
		if (err) return next(err);

		const newResource = new Resource({
			route,
			permissions: parsePermissions,
			role,
		});

		newResource.save(err => {
			if (err) {
				if (err.code === 11000)
					return res
						.status(400)
						.json({ status: 'error', msg: 'This resource is already exist!' });
				return next(err);
			}

			getRole.resources.push(newResource);
			getRole.save();

			return res
				.status(200)
				.json({ status: 'success', msg: 'successfuly created' });
		});
	});
};

// find
exports.find = (req, res, next) => {};

// update
exports.update = (req, res, next) => {};

// delete
exports.delete = (req, res, next) => {};

// validate
exports.validate = Joi.object().keys({
	route: Joi.string().required(),
	permissions: Joi.object().required(),
	role: Joi.string().required(),
});
exports.params = Joi.object().keys({
	id: Joi.number()
		.min(1)
		.required(),
});
