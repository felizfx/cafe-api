import { Server } from "socket.io";
import server from "../../server.js";
import names from "./names.js";
import moment from "moment-timezone";

const io = new Server(server, {
	cors: {
		origin: "*"
	}
});

let count = 0;
var nameInterval;

io.of("/").on("connection", (socket) => {
	socket.emit("currentName", names[count]);
});

const person = () => {
	if(count === names.length) count = 0;
	io.emit("new_name", names[count]);
	count++;

	timer().stop();
	setTimeout(() => {
		timer().start();
	}, 60000);
};

const timer = () => {
	return {
		start() {
			nameInterval = setInterval(() => {
				const timeInBrasilia = moment().tz("America/Sao_Paulo").format("HH");
				if(timeInBrasilia === "14") person();
			}, 60000);
		},
		stop() {
			clearInterval(nameInterval);
		}
	};
};

timer().start();