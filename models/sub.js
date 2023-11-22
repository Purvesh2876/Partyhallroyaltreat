const mongoose = require("mongoose");

const subSchema = mongoose.Schema(
	{
		
		country: {
			type: String,
		},
		name: {
			type: String,
		},
		price: {
			type: String,
		},
		tag: {
			type: String,
		},
		image: {
			type: String,
			// default:"https://res.cloudinary.com/dfsixliv3/image/upload/v1658858519/upload/medi_ryt5uc.jpg",
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

exports.Sub = mongoose.model("Sub", subSchema);
