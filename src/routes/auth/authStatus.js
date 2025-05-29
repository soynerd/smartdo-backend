import express from 'express'
import {config} from '../../config/index.js';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.get("/auth-status", async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: "Unauthorized" });
    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Unauthorized" });
        return res.status(200).json({ message: "Authorized", userData: user });
    })
});

export default router;