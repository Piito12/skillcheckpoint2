import Router from "express";
import { pool } from "../utils/db.js";

const mediaRouter = Router();

mediaRouter.post("/:id/media", async (req, res) => {
  const postId = req.params.id;
  const url = req.body.url;

  await pool.query(
    `insert into media (post_id , url)
    values($1, $2)
    `,
    [postId, url]
  );

  return res.json({
    message : `Attach url to Post ID ${postId}`
  });
});

mediaRouter.post("/:id/comments/:commentId/media", async (req, res) => {
  const url = req.body.url;
  const commentId = req.params.commentId;

  await pool.query(
    `
    insert into media (comment_id, url)
    values ($1, $2)
    `,
    [commentId, url]
  );
  
  return res.json({
    message : `Attech url to  comments ID ${commentId}`
  })
});
export default mediaRouter;
