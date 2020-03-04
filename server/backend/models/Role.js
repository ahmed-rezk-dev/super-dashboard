const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		resources: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Resource',
			},
		],
	},
	{ timestamps: true }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
