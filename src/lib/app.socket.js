import { Server } from "socket.io";
import server from "../../server.js";
import moment from "moment-timezone";
import NameController from "../controller/NamesController.js";

var nameInterval;

const io = new Server(server, {
	cors: {
		origin: "*"
	}
});

io.of("/").on("connection", async (socket) => {
	socket.emit("currentName", await NameController.getCurrentName());
});

const newPerson = async () => {
	const names = await NameController.getAllNames("name");
	let currentIndex = names.findIndex(name => name.isToday);
	if (currentIndex !== -1) {
		names[currentIndex].isToday = false;
		let nextIndex = currentIndex + 1 < names.length ? currentIndex + 1 : 0;
		names[nextIndex].isToday = true;
		NameController.updateNames(names);
		return names[nextIndex];
	}
};

const person = async () => {
	if(((day) => day === 0 || day === 6)(new Date().getDay())) return;

	io.emit("new_name", await newPerson());

	timer().stop();
	setTimeout(() => {
		timer().start();
	}, 3600000);
};

const timer = () => {
	return {
		start() {
			nameInterval = setInterval(() => {
				const timeInBrasilia = moment().tz("America/Sao_Paulo").format("HH");
				if(timeInBrasilia === "12") person();
			}, 60000);
		},
		stop() {
			clearInterval(nameInterval);
		}
	};
};

timer().start();