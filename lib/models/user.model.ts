import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: null,
	},
	bio: {
		type: String,
		default: null,
		maxlength: 500,
	},
	threads: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Thread",
		},
	],
	onboarded: {
		type: Boolean,
		default: false,
	},
	communities: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Community",
		},
	],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
