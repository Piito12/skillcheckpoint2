import Router from "express";
import { pool } from "../utils/db.js";

const votecommentRounter = Router();

votecommentRounter.get("/:id/comments/:commentId/vote", async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;

  const upvote = await pool.query(
    `select * from vote_comment
      where comment_id = $1 AND status = 'upvote'
      `,
    [commentId]
  );
  const downvote = await pool.query(
    `select * from vote_comment
      where comment_id = $1 AND status = 'downvote'
      `,
    [commentId]
  );

  const count = upvote.rowCount - downvote.rowCount;
  return res.json({
    message: `Vote on post ID ${postId} and comment ID ${commentId} Vote is ${count}`,
  });
});

votecommentRounter.post("/:id/comments/:commentId/upvote", async (req, res) => {
  const commentId = req.params.commentId;
  const isVoted = await pool.query(
    `
  select * from vote_comment
  where comment_id = $1 and status = 'upvote'
  `,
    [commentId]
  );
  // console.log(isVoted);

  if (isVoted.rowCount === 0) {
    await pool.query(
      `insert into vote_comment (user_id, comment_id, status)
      values ($1, $2 , 'upvote')
      `,
      [1, commentId]
    );
  } else {
    await pool.query(
      `
      delete from vote_comment
      where  comment_id = $1 and status = 'upvote'
      `,
      [commentId]
    );
    return res.send("downvot deleteds");
  }

  return res.json({
    message: "upvote is successful!!",
  });
});

votecommentRounter.post(
  "/:id/comments/:commentId/downvote",
  async (req, res) => {
    const commentId = req.params.commentId;

    const isVoted = await pool.query(
      `
    select * from vote_comment
    where comment_id = $1 and status = 'downvote'
    `,
      [commentId]
    );

    if (isVoted.rowCount === 0) {
      await pool.query(
        `
      insert into vote_comment (user_id, comment_id, status)
      values ($1, $2 , 'downvote')
      `,
        [1, commentId]
      );
    } else {
      await pool.query(
        `
        delete from vote_comment
        where  comment_id = $1 and status = 'downvote'
        `,
        [commentId]
      );
      return res.send("downvot deleteds");
    }

    return res.json({
      message: "downvote is successful!!",
    });
  }
);

export default votecommentRounter;
