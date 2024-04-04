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
	console.log("user connected, id:", socket.id);
});

const person = () => {
	if(count === names.length - 1) count = 0;
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
				if(new Date().getHours() === 18) person();
			}, 5000);
		},
		stop() {
			clearInterval(nameInterval);
		}
	};
};

timer().start();