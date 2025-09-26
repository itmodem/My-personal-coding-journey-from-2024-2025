import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();


app.get('/test',(req,res) =>{
    res.send('✅ Successfully setuped your project');
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})