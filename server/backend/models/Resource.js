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
	{ timestamps: true }
);

let Resource = null;
try {
	Resource = mongoose.model('Resource', resourceSchema);
} catch (e) {
	Resource = mongoose.model('Resource');
}
module.exports = Resource;
