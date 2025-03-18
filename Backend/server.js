import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/Db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import path from "path";
import cartRouter from "./routes/cartRoute.js";
import { fileURLToPath } from "url";
import orderRouter from "./routes/orderRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],  // ✅ Allow multiple origins
    credentials: true,
}));


app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use('/api/order',orderRouter)



app.get("/", (req, res) => {
    res.send("API is working");
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

