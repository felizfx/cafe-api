import { Server } from "socket.io";
import server from "../../server.js";
import names from "./names.js";
import moment from "moment-timezone";

console.log(new Date().getDay());

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
	if(((day) => day === 0 || day === 6)(new Date().getDay())) return;

	if(count === names.length) count = 0;
	io.emit("new_name", names[count]);
	count++;

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