import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  repositories: [
    {
      default: [],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
    },
  ],
  followedUsers: [
    {
      default: [],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  starRepos: [
    {
      default: [],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
