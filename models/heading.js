const mongoose = require("mongoose");

const headingSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		
		created_at: {
			type: Date,
			default: Date.now,
		},
		updated_at: {
			type: Date,
			default: Date.now,
		},
		
	},
	{
		versionKey: false,
	}
);

exports.Heading = mongoose.model("Heading", headingSchema);
