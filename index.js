import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./src/config/index.js";
import {
  logout,
  authStatus,
  googleAuth,
  userDetails,
  taskData,
  updateTask,
  deleteTask,
  githubAuth,
  openAiResponse,
} from "./src/routes/index.js";

import verifyAuth from "./src/middleware/authToken.js";

const app = express();
const port = config.port;
const corsOptions = {
  origin: config.frontendUrl,
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/auth", authStatus);
app.use("/auth", googleAuth);
app.use("/auth", githubAuth);
app.use("/auth", verifyAuth, logout);

app.use("/data", verifyAuth, userDetails);
app.use("/data", verifyAuth, taskData);
app.use("/data", verifyAuth, updateTask);
app.use("/data", verifyAuth, deleteTask);

app.use("/response", openAiResponse);

app.get("/", (req, res) => {
  res.send({ message: "hello from backend", activeStatus: true });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started :-) `);
});
