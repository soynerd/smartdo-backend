import express from 'express'
import {db} from '../../config/index.js';
const router = express.Router();

router.post("/deleteTask", async (req, res) => {
        const {id} = req.body;
        try {
            await db.query("DELETE FROM tasks WHERE id = $1", [id]);
            return res.status(200).json({ message: "Deleted Successfully" });
        } catch (err) {
            console.error("/deleteTask :: delete ::",err);
            return res.status(500).json({ message: "Internal Server Error" });            
        }
    });
    
    export default router;