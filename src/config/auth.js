import express from "express";
import authToken from "../middleware/authToken.js"


const router = express.Router();
const JWT_SECRET = "hello";




router.get("/profile", authToken, (req, res)=>{
    res.json({data : "what you want to send from database send it from here"})
})

export default router