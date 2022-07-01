const Question = require("../../models/Question")

const getAllQuestions  = async (req, res) => {
    try {
        const questions = await Question.find().exec()

        return res.status(200).json(questions)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const getSingleQuestion  = async (req, res) => {
    try {
        const question = await Question.findOne({_id: req.params.id}).exec()

        return res.status(200).json(question)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const createQuestion = async (req, res) => {
    if(!req?.body) return res.status(400).json({"message": "body parameters are required !"})

    try {
        const newQuestion = await Question.create({
            creator: req.body.username, //jwt req.id here 
            content: req.body.content,
        })

        return res.status(200).json(newQuestion)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const updateQuestion = async (req, res) => {
    if(!req?.body) return res.status(400).json({"message": "body parameters are required !"})

    try {
        const question =  await Question.findOne({_id: req.body.id}).exec()
        
        if(!question){
            return res.status(400).json({"message": `No Question match the id ${req.body.id} !`})
        }

        question.content = req.body.content
        question.updator = req.body.username //jwt req.id here 
        
        const updatedQuestion = await question.save()

        return res.json(updatedQuestion)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findOne({_id: req.params.id})
        if(!question) {
            return res.status(204).json({"message": `No Question match the id ${req.params.id}`})
        }

        const deletedQuestion = await Question.deleteOne({_id: req.params.id})

        return res.status(200).json(deletedQuestion)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

module.exports = {
    getAllQuestions,
    getSingleQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
}