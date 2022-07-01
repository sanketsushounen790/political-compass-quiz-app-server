const expess = require('express')
const router = expess.Router()

const resultControllers = require('../controllers/resultControllers')

router.post('/image', resultControllers.generateResultImage)
router.post('/comment', resultControllers.generateResultComment)

module.exports = router