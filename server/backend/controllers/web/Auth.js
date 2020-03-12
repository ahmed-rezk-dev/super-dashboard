const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
const validator = require('validator');
const mailChecker = require('mailchecker');
const User = require('../../models/User');
const passportConfig = require('../../config/passport.js');

const randomBytesAsync = promisify(crypto.randomBytes);

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
	const validationErrors = {};
	if (!validator.isEmail(req.body.email))
		validationErrors.email = 'Please enter a valid email address.';
	if (validator.isEmpty(req.body.password))
		validationErrors.password = 'Password cannot be blank.';

	if (validationErrors.length) {
		return res.status(400).json({
			status: 'inputsError',
			errors: validationErrors,
		});
	}

	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	});

	User.findOne({ email: req.body.email.toLowerCase() })
		.populate({ path: 'role', populate: { path: 'resources' } })
		.exec((err, user) => {
			if (err) {
				if (err) {
					return next(err);
				}
			}
			if (!user) {
				return res.status(400).json({
					status: 'error',
					msg: `Email ${req.body.email} not found.`,
				});
			}
			return user.comparePassword(req.body.password, (error, isMatch) => {
				console.log('isMatch', isMatch);
				if (error) {
					if (error) {
						return next(err);
					}
				}

				if (isMatch) {
					// Sign token
					const [newToken, newRefreshToken] = passportConfig.createTokens(user);
					return res.status(200).json({
						status: 'success',
						msg: 'Success! You are logged in.',
						token: newToken,
						refreshToken: newRefreshToken,
					});
				}
				return res.status(400).json({
					status: 'error',
					msg: 'Invalid password.',
				});
			});
		});
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {
	const validationErrors = [];
	if (!validator.isEmail(req.body.email))
		validationErrors.push({ msg: 'Please enter a valid email address.' });
	if (!validator.isLength(req.body.password, { min: 8 }))
		validationErrors.push({
			msg: 'Password must be at least 8 characters long',
		});
	if (req.body.password !== req.body.confirmPassword)
		validationErrors.push({ msg: 'Passwords do not match' });

	if (validationErrors.length) {
		req.flash('errors', validationErrors);
		return res.redirect('/signup');
	}
	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	});

	const user = new User({
		email: req.body.email,
		password: req.body.password,
	});

	User.findOne({ email: req.body.email }, (err, existingUser) => {
		if (err) {
			return next(err);
		}
		if (existingUser) {
			req.flash('errors', {
				msg: 'Account with that email address already exists.',
			});
			return res.redirect('/signup');
		}
		user.save(err => {
			if (err) {
				return next(err);
			}
			req.logIn(user, err => {
				if (err) {
					return next(err);
				}
				res.redirect('/');
			});
		});
	});
};

// #region GET /account
exports.getAccount = (req, res) =>
	res.status(200).json({
		status: 'success',
		data: req.user || null,
	});
// #endregion

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
	const validationErrors = [];
	if (!validator.isEmail(req.body.email))
		validationErrors.push({ msg: 'Please enter a valid email address.' });

	if (validationErrors.length) {
		req.flash('errors', validationErrors);
		return res.redirect('/account');
	}
	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	});

	User.findById(req.user.id, (err, user) => {
		if (err) {
			return next(err);
		}
		if (user.email !== req.body.email) user.emailVerified = false;
		user.email = req.body.email || '';
		user.profile.name = req.body.name || '';
		user.profile.gender = req.body.gender || '';
		user.profile.location = req.body.location || '';
		user.profile.website = req.body.website || '';
		user.save(err => {
			if (err) {
				if (err.code === 11000) {
					req.flash('errors', {
						msg:
							'The email address you have entered is already associated with an account.',
					});
					return res.redirect('/account');
				}
				return next(err);
			}
			req.flash('success', {
				msg: 'Profile information has been updated.',
			});
			res.redirect('/account');
		});
	});
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
	const validationErrors = [];
	if (!validator.isLength(req.body.password, { min: 8 }))
		validationErrors.push({
			msg: 'Password must be at least 8 characters long',
		});
	if (req.body.password !== req.body.confirmPassword)
		validationErrors.push({ msg: 'Passwords do not match' });

	if (validationErrors.length) {
		req.flash('errors', validationErrors);
		return res.redirect('/account');
	}

	User.findById(req.user.id, (err, user) => {
		if (err) {
			return next(err);
		}
		user.password = req.body.password;
		user.save(err => {
			if (err) {
				return next(err);
			}
			req.flash('success', { msg: 'Password has been changed.' });
			res.redirect('/account');
		});
	});
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
	User.deleteOne({ _id: req.user.id }, err => {
		if (err) {
			return next(err);
		}
		req.logout();
		req.flash('info', { msg: 'Your account has been deleted.' });
		res.redirect('/');
	});
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = (req, res, next) => {
	console.log('req', req);
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}

	if (!validator.isHexadecimal(req.params.token))
		return res
			.status(400)
			.json({ status: 'error', msg: 'Invalid Token.  Please retry.' });

	User.findOne({ passwordResetToken: req.params.token })
		.where('passwordResetExpires')
		.gt(Date.now())
		.exec((err, user) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(400).json({
					status: 'error',
					msg: 'Password reset token is invalid or has expired.',
				});
			}
			return res.status(200).json({ status: 'success', msg: 'Valid token' });
		});
};

/**
 * GET /account/verify/:token
 * Verify email address
 */
exports.getVerifyEmailToken = (req, res, next) => {
	if (req.user.emailVerified) {
		req.flash('info', { msg: 'The email address has been verified.' });
		return res.redirect('/account');
	}

	const validationErrors = [];
	if (req.params.token && !validator.isHexadecimal(req.params.token))
		validationErrors.push({ msg: 'Invalid Token.  Please retry.' });
	if (validationErrors.length) {
		req.flash('errors', validationErrors);
		return res.redirect('/account');
	}

	if (req.params.token === req.user.emailVerificationToken) {
		User.findOne({ email: req.user.email })
			.then(user => {
				if (!user) {
					req.flash('errors', {
						msg: 'There was an error in loading your profile.',
					});
					return res.redirect('back');
				}
				user.emailVerificationToken = '';
				user.emailVerified = true;
				user = user.save();
				req.flash('info', {
					msg: 'Thank you for verifying your email address.',
				});
				return res.redirect('/account');
			})
			.catch(error => {
				console.log(
					'Error saving the user profile to the database after email verification',
					error
				);
				req.flash('error', {
					msg:
						'There was an error when updating your profile.  Please try again later.',
				});
				return res.redirect('/account');
			});
	}
};

/**
 * GET /account/verify
 * Verify email address
 */
exports.getVerifyEmail = (req, res, next) => {
	if (req.user.emailVerified) {
		req.flash('info', { msg: 'The email address has been verified.' });
		return res.redirect('/account');
	}

	if (!mailChecker.isValid(req.user.email)) {
		req.flash('errors', {
			msg:
				'The email address is invalid or disposable and can not be verified.  Please update your email address and try again.',
		});
		return res.redirect('/account');
	}

	const createRandomToken = randomBytesAsync(16).then(buf =>
		buf.toString('hex')
	);

	const setRandomToken = token => {
		User.findOne({ email: req.user.email }).then(user => {
			user.emailVerificationToken = token;
			user = user.save();
		});
		return token;
	};

	const sendVerifyEmail = token => {
		let transporter = nodemailer.createTransport({
			service: 'SendGrid',
			auth: {
				user: process.env.SENDGRID_USER,
				pass: process.env.SENDGRID_PASSWORD,
			},
		});
		const mailOptions = {
			to: req.user.email,
			from: 'hackathon@starter.com',
			subject: 'Please verify your email address on Hackathon Starter',
			text: `Thank you for registering with hackathon-starter.\n\n
        This verify your email address please click on the following link, or paste this into your browser:\n\n
        http://${req.headers.host}/account/verify/${token}\n\n
        \n\n
        Thank you!`,
		};
		return transporter
			.sendMail(mailOptions)
			.then(() => {
				req.flash('info', {
					msg: `An e-mail has been sent to ${req.user.email} with further instructions.`,
				});
			})
			.catch(err => {
				if (err.message === 'self signed certificate in certificate chain') {
					console.log(
						'WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.'
					);
					transporter = nodemailer.createTransport({
						service: 'SendGrid',
						auth: {
							user: process.env.SENDGRID_USER,
							pass: process.env.SENDGRID_PASSWORD,
						},
						tls: {
							rejectUnauthorized: false,
						},
					});
					return transporter.sendMail(mailOptions).then(() => {
						req.flash('info', {
							msg: `An e-mail has been sent to ${req.user.email} with further instructions.`,
						});
					});
				}
				console.log(
					'ERROR: Could not send verifyEmail email after security downgrade.\n',
					err
				);
				req.flash('errors', {
					msg:
						'Error sending the email verification message. Please try again shortly.',
				});
				return err;
			});
	};

	createRandomToken
		.then(setRandomToken)
		.then(sendVerifyEmail)
		.then(() => res.redirect('/account'))
		.catch(next);
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
	const validationErrors = [];
	if (!validator.isLength(req.body.password, { min: 8 }))
		validationErrors.password = 'Password must be at least 8 characters long';
	if (req.body.password !== req.body.confirm)
		validationErrors.passwordConfirmation = 'Passwords do not match';
	if (!validator.isHexadecimal(req.params.token))
		return res
			.status(400)
			.json({ status: 'error', msg: 'Invalid Token.  Please retry.' });

	if (validationErrors.length) {
		return res
			.status(400)
			.json({ status: 'inputsError', errors: validationErrors });
	}

	const resetPassword = () =>
		User.findOne({ passwordResetToken: req.params.token })
			.where('passwordResetExpires')
			.gt(Date.now())
			.then(user => {
				if (!user) {
					return res.status(400).json({
						status: 'error',
						msg: 'Password reset token is invalid or has expired.',
					});
				}
				user.password = req.body.password;
				user.passwordResetToken = undefined;
				user.passwordResetExpires = undefined;
				return user.save().then(
					() =>
						new Promise((resolve, reject) => {
							req.logIn(user, err => {
								if (err) {
									return reject(err);
								}
								resolve(user);
							});
						})
				);
			});

	const sendResetPasswordEmail = user => {
		if (!user) {
			return;
		}
		let transporter = nodemailer.createTransport({
			service: 'SendGrid',
			auth: {
				user: process.env.SENDGRID_USER,
				pass: process.env.SENDGRID_PASSWORD,
			},
		});
		const mailOptions = {
			to: user.email,
			from: 'hackathon@starter.com',
			subject: 'Your Hackathon Starter password has been changed',
			text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
		};
		return transporter
			.sendMail(mailOptions)
			.then(() =>
				res.status(200).json({
					status: 'success',
					msg: 'Success! Your password has been changed.',
				})
			)
			.catch(err => {
				if (err.message === 'self signed certificate in certificate chain') {
					console.log(
						'WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.'
					);
					transporter = nodemailer.createTransport({
						service: 'SendGrid',
						auth: {
							user: process.env.SENDGRID_USER,
							pass: process.env.SENDGRID_PASSWORD,
						},
						tls: {
							rejectUnauthorized: false,
						},
					});
					return transporter.sendMail(mailOptions).then(() =>
						res.status(200).json({
							status: 'success',
							msg: 'Success! Your password has been changed.',
						})
					);
				}
				console.log(
					'ERROR: Could not send password reset confirmation email after security downgrade.\n',
					err
				);
				res.status(200).json({
					status: 'success',
					msg:
						'Your password has been changed, however we were unable to send you a confirmation email. We will be looking into it shortly.',
				});
				return err;
			});
	};

	resetPassword()
		.then(sendResetPasswordEmail)
		// .then(() => {
		// 	if (!res.finished) res.redirect('/');
		// })
		.catch(err => next(err));
};

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	res.render('account/forgot', {
		title: 'Forgot Password',
	});
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => {
	const validationErrors = [];
	if (!validator.isEmail(req.body.email))
		validationErrors.push({ msg: 'Please enter a valid email address.' });

	if (validationErrors.length) {
		return res
			.status(400)
			.json({ status: 'inputsError', errors: validationErrors });
	}
	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	});

	const createRandomToken = randomBytesAsync(16).then(buf =>
		buf.toString('hex')
	);

	const setRandomToken = token =>
		User.findOne({ email: req.body.email }).then(user => {
			if (!user) {
				return res.status(400).json({
					status: 'error',
					msg: 'Account with that email address does not exist.',
				});
			}
			user.passwordResetToken = token;
			user.passwordResetExpires = Date.now() + 3600000; // 1 hour
			user = user.save();

			return user;
		});

	const sendForgotPasswordEmail = user => {
		if (!user) {
			return;
		}
		const token = user.passwordResetToken;
		let transporter = nodemailer.createTransport({
			service: 'SendGrid',
			auth: {
				user: process.env.SENDGRID_USER,
				pass: process.env.SENDGRID_PASSWORD,
			},
		});
		const mailOptions = {
			to: user.email,
			from: 'hackathon@starter.com',
			subject: 'Reset your password on Hackathon Starter',
			text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:3000/auth?token=${token}#reset\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
		};
		return transporter
			.sendMail(mailOptions)
			.then(() =>
				res.status(200).json({
					status: 'success',
					msg: `An e-mail has been sent to ${user.email} with further instructions.`,
				})
			)
			.catch(err => {
				if (err.message === 'self signed certificate in certificate chain') {
					console.log(
						'WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.'
					);
					transporter = nodemailer.createTransport({
						service: 'SendGrid',
						auth: {
							user: process.env.SENDGRID_USER,
							pass: process.env.SENDGRID_PASSWORD,
						},
						tls: {
							rejectUnauthorized: false,
						},
					});
					return transporter.sendMail(mailOptions).then(() =>
						res.status(200).json({
							status: 'success',
							msg: `An e-mail has been sent to ${user.email} with further instructions.`,
						})
					);
				}
				console.log(
					'ERROR: Could not send forgot password email after security downgrade.\n',
					err
				);
				res.status(400).json({
					status: 'error',
					msg:
						'Error sending the password reset message. Please try again shortly.',
				});
				return err;
			});
	};

	createRandomToken
		.then(setRandomToken)
		.then(sendForgotPasswordEmail)
		// .then(() => res.redirect('/forgot'))
		.catch(next);
};
