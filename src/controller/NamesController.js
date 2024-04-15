import NameRepository from "../models/Name.js";

class NameController {
	static async getCurrentName() {
		try {
			const name = await NameRepository.findOne({isToday: true});
			return name;
		} catch (e){
			console.log(e);
		}
	}

	static async getAllNames(sort) {
		try {
			const names = await NameRepository.find({}).sort(sort);
			return names;
		} catch (e){
			console.log(e);
		}
	}

	static async updateNames(names) {
		try {
			await NameRepository.create(names);
		} catch (e){
			console.log(e);
		}
	}
}

export default NameController;