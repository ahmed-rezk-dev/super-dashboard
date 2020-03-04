const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const _ = require('lodash');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Create new api token & refresh token
 */
const createTokens = user => {
	const payload = user.toJSON();

	const createToken = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
		// expiresIn: '7d', // Just for testing
		expiresIn: '1m',
	});

	const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY + user.password;

	const createRefreshToken = jwt.sign(payload, refreshSecretKey, {
		expiresIn: '7d',
	});

	return [createToken, createRefreshToken];
};

const createRefreshToken = (token, refreshToken, fn) => {
	console.log('Entered createRefreshToken');
	let userId = -1;
	try {
		const decodeUserObject = jwt.decode(token);
		// console.log('decodeUserObject', decodeUserObject);
		userId = decodeUserObject._id;
	} catch (err) {
		console.error('Error to find the user id in |createRefreshToken|', err);
		return {};
	}

	if (!userId) {
		return {};
	}

	User.findById(userId)
		.populate({ path: 'role', populate: { path: 'resources' } })
		.exec((err, user) => {
			if (user) {
				const refreshSecretKey =
					process.env.REFRESH_TOKEN_SECRET_KEY + user.password;

				try {
					jwt.verify(refreshToken, refreshSecretKey);
				} catch (err) {
					console.error(
						'Error trying to verify the old refresh Token in |createRefreshToken| =>',
						err
					);
					return {};
				}
				const [newToken, newRefreshToken] = createTokens(user);
				return fn({ newToken, newRefreshToken });
			}
		});
};

/** isAuthenticatedJwt
 * Login Required middleware.
 */
exports.isAuthenticatedJwt = (req, res, next) => {
	const token = req.headers['x-token'] || false;
	const refreshToken = req.headers['x-refresh-token'] || false;
	const secretKey = process.env.TOKEN_SECRET_KEY;

	// only for testing
	// const user = jwt.verify(token, secretKey);
	// req.user = user;
	// return next();

	try {
		const user = jwt.verify(token, secretKey);
		req.user = user;
	} catch (e) {
		createRefreshToken(token, refreshToken, newTokens => {
			if (newTokens) {
				return res
					.status(401)
					.json({ status: 'error', msg: e.name, ...newTokens });
			}
		});

		console.error('Error in jwt isAuthenticatedJwt function: => jwt expired');
		return;
	}

	if (!token || !refreshToken) {
		return res.status(401).json({ status: 'error', msg: 'unauthorized' });
	}

	return next();
};

exports.createTokens = createTokens;
exports.createRefreshToken = createRefreshToken;
