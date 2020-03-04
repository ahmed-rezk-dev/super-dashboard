const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
	{
		route: { type: String, unique: true },
		role: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role',
		},
		permissions: { type: Object },
	},
	{ timestamps: true },
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
