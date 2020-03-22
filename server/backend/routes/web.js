const express = require('express');

const router = express.Router();
const passportConfig = require('../config/passport');
const isUserAuthorized = require('../middlewares/isUserAuthorized');
const Helper = require('../utils/helper');
// Controllers
const authController = require('../controllers/web/Auth');
const publicController = require('../controllers/web/public');
// Routes
const userRoutes = require('./users');
const rolesRoutes = require('./roles');
const resourcesRoutes = require('./resources');

// ِAuth
router.post('/login', authController.postLogin);
router.get(
	'/account',
	[passportConfig.isAuthenticatedJwt, isUserAuthorized],
	authController.getAccount
);
router.post('/forgot', authController.postForgot);
router.get('/reset/:token', authController.getReset);
router.post('/reset/:token', authController.postReset);
router.post('/reset/:token', authController.postReset);
// Public
router.get('/routes', publicController.routesList);
// Users
router.use('/users', [isUserAuthorized], userRoutes);
//
router.use(
	'/roles',
	[passportConfig.isAuthenticatedJwt, isUserAuthorized],
	rolesRoutes
);
// resources
router.use(
	'/resources',
	[passportConfig.isAuthenticatedJwt, isUserAuthorized],
	resourcesRoutes
);

// Routes list
const routesList = {};
router.stack.forEach(item => {
	const tiem = Helper.split(item.regexp);
	if (item.name === 'router') {
		routesList[tiem] = true;
	} else {
		routesList[tiem] = false;
	}
});

exports.routesList = routesList;
module.exports = router;
