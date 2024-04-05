import express from "express";
import cors from "cors";

const app = express();

app.get("/", (req, res) => {
	res.status(200).json({ message: "café api!"});
});

app.get("/api/healthcheck", (req, res) => {
	console.log("requisição recebida");
	res.status(200).json({ status: "ok" });
});

app.use(cors());

export default app;