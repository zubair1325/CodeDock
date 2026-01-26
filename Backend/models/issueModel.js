import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "close"],
    default: "open",
  },
  repository: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Repository",
    required: true,
  },
});

const Issue = mongoose.model("Issue", IssueSchema);
export default Issue;
