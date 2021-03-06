const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
	{
		email: { type: String, unique: true },
		password: String,
		passwordResetToken: String,
		passwordResetExpires: Date,
		emailVerificationToken: String,
		emailVerified: Boolean,
		role: {
			type: Schema.Types.ObjectId,
			ref: 'Role',
		},

		snapchat: String,
		facebook: String,
		twitter: String,
		google: String,
		github: String,
		instagram: String,
		linkedin: String,
		steam: String,
		quickbooks: String,
		tokens: Array,

		profile: {
			name: String,
			gender: String,
			location: {
				lat: Number,
				lng: Number,
				address: String,
				city: String,
				postcode: Number,
				county: String,
				state: String,
				country: String,
			},
			website: String,
			picture: String,
		},
	},
	{ timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
	const user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(
	candidatePassword,
	cb
) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		cb(err, isMatch);
	});
};

userSchema.methods.comparePasswordSync = async function comparePasswordSync(
	candidatePassword,
	next
) {
	try {
		return await bcrypt.compare(candidatePassword, this.password);
	} catch (error) {
		return next(error);
	}
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
	if (!size) {
		size = 200;
	}
	if (!this.email) {
		return `https://gravatar.com/avatar/?s=${size}&d=retro`;
	}
	const md5 = crypto
		.createHash('md5')
		.update(this.email)
		.digest('hex');
	return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

let User = null;
try {
	User = mongoose.model('User', userSchema);
} catch (e) {
	User = mongoose.model('User');
}
module.exports = User;
