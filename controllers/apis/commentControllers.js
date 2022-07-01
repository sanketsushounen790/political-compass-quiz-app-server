const Comment = require("../../models/Comment")

const getAllComments  = async (req, res) => {
    try {
        const comments = await Comment.find().exec()

        return res.status(200).json(comments)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const createComment = async (req, res) => {
    if(!req?.body) return res.status(400).json({"message": "body parameters are required !"})

    try {
        const newComment = await Comment.create({
            creator: req.body.username, //jwt req.id here 
            content: req.body.content,
            xPosition: req.body.xPosition,
            yPosition: req.body.yPosition
        })

        return res.status(200).json(newComment)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const updateComment = async (req, res) => {
    if(!req?.body) return res.status(400).json({"message": "body parameters are required !"})

    try {
        const comment =  await Comment.findOne({
            xPosition: req.body.xPosition,
            yPosition: req.body.yPosition
        }).exec()
        
        if(!comment){
            return res.status(400).json({
                "message": `no comment match the xPosition ${req.body.xPosition} and the yPosition ${req.body.yPosition} !`
            })
        }

        comment.content = req.body.content
        comment.updator = req.body.username //jwt req.id here 
        
        const updatedComment = await comment.save()

        return res.json(updatedComment)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({_id: req.params.id})
        if(!comment) {
            return res.status(204).json({"message": `No Comment match the id ${req.params.id}`})
        }

        const deletedComment = await comment.deleteOne({_id: req.params.id})

        return res.status(200).json(deletedComment)
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": error.message})
    }
}


module.exports = {
    getAllComments,
    createComment,
    updateComment,
    deleteComment
}