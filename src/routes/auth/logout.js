import express from 'express';
const router = express.Router();

router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.redirect("http://localhost:5173/");
  });
  
  export default router;