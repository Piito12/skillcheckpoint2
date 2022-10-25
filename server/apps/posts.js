import Router from "express";
import { pool } from "../utils/db.js";

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  const category = req.query.category || "";
  const keywords = req.query.keywords || "";
  let query = "";
  let values = [];

  if (category && keywords) {
    query = `select * from posts
    where category = $1
    and topic ilike $2
    limit 5
    `;
    values = [category, keywords];
  } else if (keywords) {
    query = `
    select * from posts 
    where topic ilike $1
    limit 5
    `;
    values = [keywords];
  } else if (category) {
    query = `
    select * from posts
    where category = $1
    limit 5
    `;
    values = [category];
  } else {
    query = `
    select * from posts
    limit 5
    `;
  }

  const results = await pool.query(query, values);

  return res.status(200).json({
    message: "Get data successful!!",
    data: results.rows,
  });
});

postRouter.get("/:id", async (req, res) => {
  const result = await pool.query(
    `
    select * 
    from posts 
    where post_id = $1
    `,
    [req.params.id]
  );

  return res.status(200).json({
    data: result.rows[0],
  });
});

postRouter.post("/", async (req, res) => {
  const newPost = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  };

  await pool.query(
    `
    insert into posts(topic, describtion , created_at, updated_at, category, user_id )
    values ($1, $2, $3, $4, $5, $6)
    `,
    [
      newPost.topic,
      newPost.describtion,
      newPost.created_at,
      newPost.updated_at,
      newPost.category,
      2,
    ]
  );

  await pool.query(`
  insert into category()
  `);

  return res.status(200).json({
    message: "Createds posts Successfull!!",
  });
});

postRouter.put("/:id", async (req, res) => {
  const updatedPost = {
    ...req.body,
    updated_at: new Date(),
  };

  await pool.query(
    `
        update posts
        set topic = $1, describtion = $2,updated_at = $3, category = $4
        where post_id = $5
    `,
    [
      updatedPost.topic,
      updatedPost.describtion,
      updatedPost.updated_at,
      updatedPost.category,
      req.params.id,
    ]
  );

  res.status(200).json({
    message: `Update Data ID ${req.params.id} successful!!`,
  });
});

postRouter.delete("/:id", async (req, res) => {
  await pool.query(
    `
    DELETE FROM posts WHERE post_id = $1
    `,
    [req.params.id]
  );

  return res.status(200).json({
    message: `Delete posts ID ${req.params.id} Successful!!`,
  });
});

export default postRouter;
