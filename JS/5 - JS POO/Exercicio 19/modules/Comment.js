class Comment {
    constructor(content, author) {
        this.content = content;
        this.author = author;
        this.createdAt = new Date()
    }
}

module.exports = Comment;