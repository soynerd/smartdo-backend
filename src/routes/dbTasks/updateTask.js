import express from 'express'
import {db} from '../../config/index.js';
const router = express.Router();

router.post("/updateTask", async (req, res) => {

    const userId = String(req.user.provider_user_id);
    const heading = req.body.taskData[0].title
    const taskData = JSON.stringify(req.body.taskData)
    const id = false;
    if(id){
        try {
            await db.query("UPDATE tasks SET task_heading = $1, task_data = $2 WHERE id = $3", [heading, taskData, id]);
            return res.status(200).json({ message: "Updated Successfully" });
        } catch (err) {
            console.error("/updateTask :: update ::",err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        
    }else{
        try {
            const data = await db.query("select * from tasks where user_id = $1 and task_heading = $2", [userId, heading]);
            if(data.rows.length === 0 ){
                await db.query("INSERT INTO tasks (user_id, task_heading, task_data) VALUES ($1, $2, $3)", [userId, heading, taskData]);
                return res.status(200).json({ message: "Added Successfully" });
            }
            return res.status(208).json({ message: "Task Already Added" });
            
        } catch (err) {
            console.error("/updateTask :: insert ::",err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        
    }
  });
  
  export default router;