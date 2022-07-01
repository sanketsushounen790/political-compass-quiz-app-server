const expess = require('express')
const router = expess.Router()

const questionControllers = require('../../controllers/apis/questionControllers')

router.get('/', questionControllers.getAllQuestions)
router.get('/:id', questionControllers.getSingleQuestion)
router.post('/create', questionControllers.createQuestion)
router.put('/update', questionControllers.updateQuestion)
router.delete('/:id', questionControllers.deleteQuestion)

module.exports = router