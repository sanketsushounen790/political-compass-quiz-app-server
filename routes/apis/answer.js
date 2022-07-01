const expess = require('express')
const router = expess.Router()

const answerControllers = require('../../controllers/apis/answerControllers')

router.get('/', answerControllers.getAllAnswers)
router.get('/:id', answerControllers.getAnswersOfTheQuestion)
router.post('/create', answerControllers.createAnswer)
router.put('/update', answerControllers.updateAnswer)
router.delete('/:id', answerControllers.deleteAnswer)

module.exports = router