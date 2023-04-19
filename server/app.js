const express = require("express");
const cors = require("cors");
const app = express();

// db;

const pool = require("./db.js");

// middleware
app.use(cors());
app.use(express.json()); // req.body

// create a todo;

app.post("/todos", async (req, res) => {
  try {
    const { name } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO b (name) VALUES($1) RETURNING *",
      [name]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// get all todo;

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (error) {
    res.json(error);
  }
});

// get a todo;

app.get("/todos/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    res.json(error);
  }
});

// update a todo;

app.put("/todos/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json(updateTodo);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// delete a todo;

app.delete("/todos/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Selected Todo Deleted Successfully");
  } catch (err) {
    res.json(err);
  }
});

// server connections

app.listen(5000, () => {
  console.log("server started at port 5000");
});
