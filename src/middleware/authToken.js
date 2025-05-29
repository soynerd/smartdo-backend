import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
function authToken(req, res, next){
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: "Unauthorized" });
    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Unauthorized" });
        req.user = user;
        next();
    })
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
  
    // if (!token) return res.sendStatus(401);
  
    // jwt.verify(token, JWT_SECRET, (err, user) => {
    //   if (err) return res.sendStatus(403);
    //   req.user = user;
    //   next();
    // });
}
export default authToken;