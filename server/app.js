import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postRouter from "./apps/posts.js";
import commentRouter from "./apps/comments.js";
import votePostRouter from "./apps/vote_post.js";
import votecommentRounter from "./apps/vote_comment.js";
import mediaRouter from "./apps/media.js";

async function init() {
  const app = express();
  const port = 4001;

  app.use(cors());
  app.use(bodyParser.json());

  app.use('/posts' , postRouter);
  app.use('/posts', commentRouter);
  app.use('/posts', votePostRouter);
  app.use('/posts', votecommentRounter);
  app.use('/posts', mediaRouter);
  
  app.get("/", (req, res) => {
    return res.send("Hello world!! THIS IS POSTS APP");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}

init();
