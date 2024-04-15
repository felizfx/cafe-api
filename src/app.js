import express from "express";
import cors from "cors";
import chalk from "chalk";
import conn from "./config/db-connection.js";

const app = express();

app.get("/", (req, res) => {
	res.status(200).json({ message: "café api!"});
});

app.get("/api/healthcheck", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use(cors());

conn.then(() => {
	console.log(chalk.green("[data_base] connection opened"));
}).catch(err => {
	console.log(chalk.red("[data_base] ERRO DE CONEXÃO: ") + err.message);
});

export default app;