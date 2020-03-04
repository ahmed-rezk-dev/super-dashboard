const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
	{
		// _id: mongoose.Schema.Types.ObjectId,
		read: Boolean,
		create: Boolean,
		write: Boolean,
		delete: Boolean,
		resource: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Resource',
		},
	},
	{ timestamps: true },
);

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
