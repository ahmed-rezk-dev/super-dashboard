const route = require('express').Router();
const usersController = require('../controllers/web/users');
const validate = require('../middlewares/validate');

route.get('/', usersController.index);
route.post('/', usersController.store);
route.get('/:id', usersController.find);
route.put(
	'/:id',
	[
		validate(usersController.params, 'params'),
		validate(usersController.validate, 'body'),
	],
	usersController.update
);
route.delete('/:id', usersController.delete);
route.post('/update/user/avatar', usersController.updateAvatar);
route.post(
	'/change/password',
	[validate(usersController.changePasswordValidate, 'body')],
	usersController.postChangePassword
);

module.exports = route;
