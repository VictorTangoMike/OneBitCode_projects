const { Router } = require('express')
const postController = require('../controllers/postController')

const router = Router()

router.post('/', postController.create)

router.get('/', postController.findAll)

router.get('/search', postController.search)

router.get('/:id', postController.findById)

router.put('/:id', postController.update)

router.delete('/:id', postController.delete)

module.exports = router;