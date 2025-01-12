const prisma = require('../database')

const Post = {
  async create(req, res) {
    const { title, content, author } = req.body
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: author,
      },
    })

    res
      .status(201)
      .json({ message: `Post ${newPost.title}, created successfully.` })
  },

  async findAll(req, res) {
    const posts = await prisma.post.findMany()
    res.json(posts)
  },

  async findById(req, res) {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json(post)
  },

  async update(req, res) {
    const { title, content } = req.body

    const post = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title,
        content,
      },
    })
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json(post)
  },

  async delete(req, res) {
    const post = await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    })
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json({ message: 'Post deleted successfully' })
  },

  async search(req, res) {
    const { title, authorId, published, startDate, endDate } = req.query

    const filter = {}

    if (title) {
      filter.title = {
        contains: title,
        mode: 'insensitive',
      }
    }
    if (authorId) {
      filter.authorId = authorId
    }
    if (published) {
      if (published === 'true') {
        filter.published = true
      } else {
        filter.published = false
      }
    }
    if (startDate || endDate) {
      filter.createdAt = {}

      if (startDate) {
        filter.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        filter.createdAt.lte = new Date(endDate)
      }
    }

    const posts = await prisma.post.findMany({
      where: filter,
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json(posts)
  },
}

module.exports = Post
