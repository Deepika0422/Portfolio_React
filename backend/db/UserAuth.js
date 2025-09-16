const mongoose = require("mongoose");

const UserAuthDb = mongoose.createConnection(
  "mongodb://localhost:27017/UserAuthDB"
);

UserAuthDb.on("connected", () => {
  console.log("UserAuthDB connected successfully");
});

const AuthSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }, // 'user' or 'admin'
});

const AuthModel = UserAuthDb.model("auth", AuthSchema);

module.exports = AuthModel;
