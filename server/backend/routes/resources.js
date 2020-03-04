const route = require('express').Router();

const resourcesController = require('../controllers/web/resources');
const validate = require('../middlewares/validate');

route.get('/', resourcesController.index);
route.post(
	'/',
	validate(resourcesController.validate, 'body'),
	resourcesController.store,
);
route.get('/:id', resourcesController.find);
route.put('/:id', resourcesController.update);
route.delete('/:id', resourcesController.delete);

module.exports = route;
