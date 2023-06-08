import express from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
    res.send("Funcionando")
})

app.listen(4001, () => console.log("Server running on Port 4001"))

