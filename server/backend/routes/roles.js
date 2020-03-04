const route = require('express').Router();

const rolesController = require('../controllers/web/roles');
const validate = require('../middlewares/validate');

route.get('/', rolesController.index);
route.post(
	'/',
	validate(rolesController.validate, 'body'),
	rolesController.store,
);
route.get('/:id', rolesController.find);
route.put(
	'/:id',
	[
		validate(rolesController.params, 'params'),
		validate(rolesController.validate, 'body'),
	],
	rolesController.update,
);
route.delete('/:id', rolesController.delete);

module.exports = route;
