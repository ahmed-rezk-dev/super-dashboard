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

let Role = null;
try {
	Role = mongoose.model('Role', roleSchema);
} catch (e) {
	Role = mongoose.model('Role');
}

module.exports = Role;
