const expess = require('express')
const router = expess.Router()

const commentControllers = require('../../controllers/apis/commentControllers')

router.get('/', commentControllers.getAllComments)
router.post('/create', commentControllers.createComment)
router.put('/update', commentControllers.updateComment)
router.delete('/:id', commentControllers.deleteComment)

module.exports = router