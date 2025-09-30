import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;
const DB_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Database connection code
try {
    await mongoose.connect(DB_URI);
    console.log("✅ MongoDB Connected Successfully");
} catch (error) {
    console.log("❌ Connection failed", error.message);
}

app.use("/todo", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})