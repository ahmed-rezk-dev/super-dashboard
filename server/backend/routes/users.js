const route = require('express').Router();

const usersController = require('../controllers/web/users');

route.get('/', usersController.index);
route.post('/', usersController.store);
route.get('/:id', usersController.find);
route.put('/:id', usersController.update);
route.delete('/:id', usersController.delete);

module.exports = route;
