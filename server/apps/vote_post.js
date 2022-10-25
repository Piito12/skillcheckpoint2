import Router from "express";
import { pool } from "../utils/db.js";

const votePostRouter = Router();

votePostRouter.get("/:id/vote", async (req, res) => {
  const postID = req.params.id;

     const upvote = await pool.query(
    `select * from vote_post
    where post_id = $1 AND status = 'upvote'
    `,
    [postID]
  );
   const downvote = await pool.query(
    `select * from vote_post
    where post_id = $1 AND status = 'downvote'
    `,
    [postID]
  );
//   console.log(upvote);
//   console.log(downvote.rowCount);

  const count = upvote.rowCount - downvote.rowCount;
  return res.json({
    message: `Vote on post ID ${req.params.id} is ${count}`,
  });
});

votePostRouter.post("/:id/upvote", async (req, res) => {
  const postId = req.params.id;
  await pool.query(
    `insert into vote_post (user_id, post_id, status)
    values ($1, $2 , 'upvote')
    `,
    [1, postId]
  );
  return res.json({
    message: "upvote successful!",
  });
});

votePostRouter.post("/:id/downvote", async (req, res) => {
  const postId = req.params.id;
  await pool.query(
    `insert into vote_post (user_id, post_id, status)
    values ($1, $2 , 'downvote')
    `,
    [1, postId]
  );

  return res.json({
    message: "downvote successful!",
  });
});

export default votePostRouter;
