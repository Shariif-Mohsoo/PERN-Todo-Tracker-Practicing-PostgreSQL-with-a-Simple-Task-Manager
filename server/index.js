// packages
import express from "express";
import cors from "cors";

//my imports
import { pool } from "./db.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

// ROUTES

// CREATE A TODO
app.post("/todos", async (req, res) => {
  try {
    // console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "insert into todo (description) values($1) returning *",
      [description]
    );
    res.json(newTodo.rows[0]);
    /*
            The RETURNING * clause returns only the specific row that was just inserted.
             So, newTodo.rows[0] will 
            contain the newly inserted row (e.g., the one where the description is 'Mohsin').
        */
  } catch (error) {
    console.error(error.message);
  }
});
// GET ALL TODO'S
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("select * from todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// GET A TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "select * from todo where todo.todo_id = $1",
      [id]
    );
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
// UPDATE A TODO
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "update todo set description = $1 where todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.error(error.message);
  }
});
// DELETE A TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("delete from todo where todo.todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

// LISTENING
app.listen(5000, () => {
  console.log("Listening at port 5000");
});
