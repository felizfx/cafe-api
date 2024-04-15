import chalk from "chalk";
import mongoose from "mongoose";

export async function connectDatabase() {
	mongoose.connect(process.env.MONGO_URL);
	return mongoose.connection;
}

export const conn = new Promise((resolve, reject) => {
	console.log(chalk.yellow("[data_base] trying connection"));

	connectDatabase().then((e) => {
		e.on("error", (error) => {
			reject(error);
		});
		e.once("open", (value) => {
			resolve(value);
		});
	});
});

export default conn;