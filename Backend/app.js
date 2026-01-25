import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import ExpressError from "./utils/ExpressError.js";
import initRepo from "./controllers/init.js";
import addRepo from "./controllers/add.js";
import commitRepo from "./controllers/commit.js";
import pushRepo from "./controllers/push.js";
import pullRepo from "./controllers/pull.js";
import revertRepo from "./controllers/revert.js";

const app = express();

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

yargs(hideBin(process.argv))
  .command("init", "Initialize a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to a new repository",
    (yargs) => {
      yargs.positional("file", {
        description: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    },
  )
  .command(
    "commit <messages>",
    "Commit the stage file",
    (yargs) => {
      yargs.positional("messages", {
        description: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.messages);
    },
  )
  .command("push", "push commits to S3", {}, pushRepo)
  .command("pull", "pull commits to S3", {}, pullRepo)
  .command(
    "revert <commitId>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitId", {
        description: "Commit id to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitId);
    },
  )
  .demandCommand(1, "You need at least one command")
  .help().argv;

// main()
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(process.env.MONGODB_URL);
// }

// app.all("/", (req, res, next) => {
//   next(new ExpressError("Page Not Found!", 404));
// });
// app.use((error, req, res, next) => {
//   console.log("entered into error middleware");
//   let { message = "Something went wrong:(", statusCode = 500 } = error;
//   res.status(statusCode).json(message);
// });

// app.listen(8080, () => {
//   console.log("server online on port 8080");
// });
