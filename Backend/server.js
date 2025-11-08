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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration - Allow multiple origins (development and production)
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // For production, you might want to restrict this
            // For now, allow all origins for easier deployment
            callback(null, true);
        }
    },
    credentials: true,
}));

connectDb();


app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use('/api/order',orderRouter)



app.get("/", (req, res) => {
    res.send("API is working");
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

