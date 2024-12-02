let posts = [
  {
    id: "1",
    title: "Introdução ao Node.js",
    content:
      "Descubra como o Node.js revolucionou o desenvolvimento web com sua arquitetura orientada a eventos.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Construindo APIs com Node.js",
    content:
      "Aprenda a criar APIs RESTful robustas e escaláveis utilizando o Node.js e o framework Express.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Gerenciando Pacotes com npm",
    content:
      "Saiba como utilizar o npm para instalar, atualizar e gerenciar pacotes de maneira eficiente em projetos Node.js.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const postModel = {
  getAllPosts: () => {
    return posts;
  },

  getPostById: (id) => {
    return posts.find((post) => post.id === id);
  },

  createPost: (title, content) => {
    const newPost = {
      id: toString(new Date().getTime()),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    postModel.savePost(newPost);

    return newPost;
  },

  savePost: (post) => {
    posts.unshift(post);

    return posts;
  },

  updatePost: (id, updatedPost) => {
    const index = posts.findIndex(post => post.id === id)
    posts[index] = { ...posts[index], ...updatedPost, updatedAt: new Date() }
  },

  deletePost: (id) => {
    return (posts = posts.filter((post) => post.id !== id));
  },
};

module.exports = postModel;
