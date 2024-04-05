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
	console.log("função");
	io.emit("new_name", names[count]);
	count++;

	timer().stop();
	setTimeout(() => {
		timer().start();
	}, 1000);
};

const timer = () => {
	return {
		start() {
			nameInterval = setInterval(() => {
				console.log(new Date().getHours());
				if(new Date().getHours() === 13) person();
			}, 1000);
		},
		stop() {
			clearInterval(nameInterval);
		}
	};
};

timer().start();