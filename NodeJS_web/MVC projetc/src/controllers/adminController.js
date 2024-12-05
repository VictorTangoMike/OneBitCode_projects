const postModel = require("../models/postModel");

module.exports = {
  // GET /admin
  showAdminPage: (req, res) => {
    const posts = postModel.getAllPosts();
    res.render("admin", { posts });
  },

  // GET /admin/create
  showCreatePage: (req, res) => {
    res.render("create");
  },

  // POST /admin/create
  createPost: (req, res) => {
    const { title, content } = req.body;

    postModel.createPost(title, content);

    res.redirect("/admin");
  },

  // GET /admin/edit/:id
  showEditPage: (req, res) => {
    const { id } = req.params;
    const post = postModel.getPostById(id);

    res.render("edit", { post });
  },

  // POST /admin/update/:id
  updatePost: (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = { title, content };
    postModel.updatePost(id, updatedPost);

    res.redirect("/admin");
  },

  // POST /admin/delete/:id
  deletePost: (req, res) => {
    const { id } = req.params;

    postModel.deletePost(id);

    res.redirect("/admin");
  },
};
