const postModel = require("../models/postModel");

const postsController = {
  index: (req, res) => {
    const posts = postModel.getAllPosts();

    res.render('index', { posts });
  },

  show: (req, res) => {
    const id = req.params.id;

    const post = postModel.getPostById(id);

    res.render('post', { post });
  }
};

module.exports = postsController;
