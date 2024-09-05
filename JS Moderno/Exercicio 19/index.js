const Author = require("./modules/Author");

const john = new Author("John Doe")

const post = john.createPost("Título do Post", "Lorem ipsum dolor sic amet ...")

post.addComment("Isaac", "Muito bom!")
post.addComment("Lucas", "Achei interessante.")

console.log(john)
console.log(post)