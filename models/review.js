const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
	{
		review: {
			type: String,
		},
		cname:{
			type:String,
		},
		clocation:{
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

exports.Review = mongoose.model("Review", reviewSchema);
