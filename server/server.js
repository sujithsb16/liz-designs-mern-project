const express = require("express");
const dotenv = require("dotenv");
const notes = [
  {
    _id: "1",
    title: "Day 1 of college",
    category: "College",
  },
  {
    _id: "2",
    title: "Day 2 of college",
    category: "College",
  },
];

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((e) => e._id === req.params.id);
  res.json(note);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server has started in the port ${PORT}`));
