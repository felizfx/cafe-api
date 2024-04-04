import express from "express";
import cors from "cors";

const app = express();

app.get("/", (req, res) => {
	res.json({ message: "Hello, world!"});
});

app.use(cors());

export default app;