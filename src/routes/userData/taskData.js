import express from 'express'
import {db} from '../../config/index.js';

const router = express.Router();

router.get("/taskData", async (req, res) => {
    
    const userId = String(req.user.provider_user_id)
    try {
        const response = await db.query("SELECT id, task_heading, task_data, updated_at FROM tasks where user_id = $1", [userId]);
        return res.status(200).json({ message: "Data from Backend", taskData: response.rows });
    } catch (err) {
        console.error("/taskData :: get ::",err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;