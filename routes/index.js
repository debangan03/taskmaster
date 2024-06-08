const express = require("express");
const router = express.Router();
const connection = require("../db"); // Import the connection from db.js

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM todos", (err, results) => {
        //console.log(results);
      if (err) throw new Error(err);
      res.render("index", { todos: results });
    });
  } catch (error) {
    console.log("error occurred");
  }
});

router.post("/add", (req, res) => {
  try {
    const task = req.body.task;
    connection.query(
      "INSERT INTO todos (task) VALUES (?)",
      [task],
      (err, results) => {
        // console.log(results);
        if (err) throw err;
        res.redirect("/");
      }
    );
  } catch (error) {
    console.log("error occurred");
  }
});

router.post("/complete/:id", (req, res) => {
  try {
    const id = req.params.id;
    connection.query(
      "UPDATE todos SET completed = ? WHERE id = ?",
      [true, id],
      (err, results) => {
        if (err) throw err;
        res.redirect("/");
      }
    );
  } catch (error) {
    console.log("error occurred");
  }
});

router.post("/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    connection.query("DELETE FROM todos WHERE id = ?", [id], (err, results) => {
      if (err) throw err;
      res.redirect("/");
    });
  } catch (error) {
    console.log("error occurred");
  }
});

module.exports = router;
