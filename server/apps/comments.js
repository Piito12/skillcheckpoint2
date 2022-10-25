import Router from "express";
import { pool } from "../utils/db.js";

const commentRouter = Router();

commentRouter.get("/:id/comments", async (req, res) => {
  const result = await pool.query(
    `
    select * 
    from comments 
    where post_id = $1
    `,
    [req.params.id]
  );

  return res.json({
    data: result.rows,
  });
});

commentRouter.post("/:id/comments", async (req, res) => {
  const newComment = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  };

  await pool.query(
    `
    insert into comments (post_id, user_id, content, created_at, updated_at)
    values ($1 , $2 , $3, $4 , $5)
    `,
    [
      req.params.id,
      newComment.user_id,
      newComment.content,
      newComment.created_at,
      newComment.updated_at,
    ]
  );

    

  return res.json({
    message: `Create  comment on post ID ${req.params.id}`,
  });
});

commentRouter.delete("/:id/comments/:commentId", async (req, res) => {
  
  const commentId = req.params.commentId;
  await pool.query(
    `
    Delete from comments
    where comment_id = $1 
     `,
    [commentId]
  );

  console.log(commentId);

  return res.json({
    message: `Delete comments on posts `,
  });
});

commentRouter.put("/:id/comment/:commentId", async (req, res) => {
  const updatedPost = {
    ...req.body,
    updated_at: new Date(),
  };

  await pool.query(
    `
          update comments
          set content = $1 , update_at = $3
          where post_id = $4 AND comment_id = $2
      `,
    [
      updatedPost.content,
      req.params.id,
      updatedPost.updated_at,
      req.params.commentId,
    ]
  );

  res.status(200).json({
    message: `Update Data ID ${req.params.id} successful!!`,
  });
});

export default commentRouter;
