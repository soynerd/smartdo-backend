import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {logout, authStatus, googleAuth, userDetails, taskData, updateTask, deleteTask, githubAuth } from './src/routes/index.js'

import verifyAuth from './src/middleware/authToken.js'

const app = express()
const port = 3000
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true 
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions))

app.use('/auth', authStatus);
app.use('/auth', googleAuth);
app.use("/auth", githubAuth);
app.use('/auth',verifyAuth, logout);

app.use('/data', verifyAuth, userDetails);
app.use('/data', verifyAuth, taskData);
app.use('/data', verifyAuth, updateTask);
app.use('/data', verifyAuth, deleteTask);


app.get('/test', verifyAuth, (req, res)=>{
    res.send({message: "hello from backend/test", data: {mail:"yobro", place:"delhi"}});
})

app.listen(port, ()=>{
    console.log(`Server started :-) `);
    
})