import mongoose from "mongoose";

const nameModel = mongoose.Schema({
	id: {
		type: Number,
		required: [true, "person id must be provider"]
	},
	name: {
		type: String,
		required: [true, "person name must be provider"]
	},
	nickName: {
		type: String,
		required: [true, "person nick name must be provider"]
	},
	isToday: {
		type: Boolean,
		default: false
	}
}, { versionKey: false });

const nameRepository = mongoose.model("names", nameModel);

export default nameRepository;