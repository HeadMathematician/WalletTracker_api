import express from "express";
import dotenv from "dotenv";

import rateLimiter from "./middleware/rateLimiter.js";
import { initDB } from "./config/db.js";

import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

//middlewares
app.use(rateLimiter)
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ 
        message: "App is running on PORT: 5002" 
    });
});

const PORT = process.env.PORT;

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
        app.listen(PORT, () => {
        console.log("Server is up and running on PORT", PORT);
    });
})