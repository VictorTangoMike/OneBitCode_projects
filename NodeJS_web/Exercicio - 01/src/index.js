const express = require("express");
const path = require("node:path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.redirect("/");
    return res.status(400).send("Por favor, preencha todos os campos.");
  } else {
    users.push({ username, email });
    res.redirect("/success");
  }
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/users", (req, res) => {
  res.render("users", { users: users });
});

app.post("/users/delete", (req, res) => {
  const { username } = req.body;
  users = users.filter((user) => user.username !== username);
  res.redirect("/users");
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () =>
  console.log(`Servidor rodando em: http://localhost:${PORT}/`)
);
