import { Server } from "socket.io";
import server from "../../server.js";
import names from "./names.js";

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
	if(count === names.length - 1) count = 0;
	io.emit("new_name", names[count]);
	count++;

	timer().stop();
	setTimeout(() => {
		timer().start();
	}, 5000);
};

const timer = () => {
	return {
		start() {
			nameInterval = setInterval(() => {
				if(new Date().getHours() === 13) person();
			}, 5000);
		},
		stop() {
			clearInterval(nameInterval);
		}
	};
};

timer().start();