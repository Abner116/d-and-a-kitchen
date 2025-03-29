import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  googleId: { type: String },
  role: { type: String, enum: ["admin", "client"], default: "client" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
