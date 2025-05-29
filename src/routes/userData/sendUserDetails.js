import express from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../../config/index.js';

const router = express.Router();

router.get("/userDetails", (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(403).json({ message: "Unauthorized" });
    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Unauthorized" });
        return res.status(200).json({ message: "Data from Backend", userDetails: user });
    })
})
export default router;