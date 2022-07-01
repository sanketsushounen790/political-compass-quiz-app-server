const Answer = require("../../models/Answer")

const getAllAnswers  = async (req, res) => {
    try {
        const answers = await Answer.find().exec()

        return res.status(200).json(answers)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const getAnswersOfTheQuestion  = async (req, res) => {
    try {
        const answers = await Answer.find({
            questionId: req.params.id
        }).exec()

        return res.status(200).json(answers)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const createAnswer = async (req, res) => {
    if(!req?.body) return res.status(400).json({"message": "body parameters are required !"})

    try {
        const newAnswer = await Answer.create({
            questionId: req.body.questionId,
            creator: req.body.username, //jwt req.id here 
            content: req.body.content,
            xPoint: req.body.xPoint,
            yPoint: req.body.yPoint
        })

        return res.status(200).json(newAnswer)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const updateAnswer = async (req, res) => {
    if(!req?.body) return res.status(400).json({"message": "body parameters are required !"})

    try {
        const answer =  await Answer.findOne({_id: req.body.id}).exec()
        
        if(!answer){
            return res.status(400).json({"message": `No Answer match the id ${req.body.id} !`})
        }

        answer.content = req.body.content
        answer.updator = req.body.username, //jwt req.id here 
        answer.xPoint = req.body.xPoint,
        answer.yPoint = req.body.yPoint
        
        const updatedAnswer = await answer.save()

        return res.json(updatedAnswer)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const deleteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findOne({_id: req.params.id})
        if(!answer) {
            return res.status(204).json({"message": `No Answer match the id ${req.params.id}`})
        }

        const deletedAnswer = await Answer.deleteOne({_id: req.params.id})

        return res.status(200).json(deletedAnswer)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}


module.exports = {
    getAllAnswers,
    getAnswersOfTheQuestion,
    createAnswer,
    updateAnswer,
    deleteAnswer
}