const route = require('express').Router();
const multer = require('multer');
const path = require('path');
const usersController = require('../controllers/web/users');
const validate = require('../middlewares/validate');
const upload = multer({ dest: path.join(__dirname, 'uploads') });

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

module.exports = route;
