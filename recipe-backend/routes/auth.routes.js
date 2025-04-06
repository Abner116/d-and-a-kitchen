import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { signup, login } from "../controllers/auth.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// Callback route for Google to redirect to

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false, 
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  }
);

export default router;
