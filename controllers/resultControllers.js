const { spawn } = require("child_process")
const path = require('path')
const fs = require('fs')
const Comment = require('../models/Comment')

const generateResultImage = async (req, res) => {
    if (!req?.body) return res.status(400).json({ "message": "body parameters are required !" })

    const { xPoint, yPoint } = req.body // name for .png file

    if(typeof xPoint !== 'number') return res.status(400).json({"message": "xPoint must be a number !"})
    if(typeof yPoint !== 'number') return res.status(400).json({"message": "yPoint must be a number !"})

    let x // real x point
    let y // real y point

    if (xPoint > 39) {
        x = 39
    } else if (xPoint < -39) {
        x = -39
    } else {
        x = xPoint
    }

    if (yPoint > 39) {
        y = 39
    } else if (yPoint < -39) {
        y = -39
    } else {
        y = yPoint
    }

    const childPython = spawn(
        'python',
        ["drawOnPoliticalCompass.py", x, y, xPoint, yPoint]
    )

    childPython.stderr.on('data', data => {
        console.error(`stderr: ${data}`)

        return res.json({ "message": `error: ${data}` })
    })

    childPython.on("close", (code) => {
        console.log(`child process exited with code ${code}`)

        if (code === 0) {
            const imagesDirPath = path.join(__dirname, '..', 'images')
            const imageName = `${JSON.stringify(xPoint)},${JSON.stringify(yPoint)}.png`

            fs.readdir(
                path.resolve(__dirname, '..', 'images'),
                (err, files) => {
                    if (err) throw err;
            
                    for (let file of files) {
                        if(file == imageName){
                            res.sendFile(`${imagesDirPath}/${imageName}`)
                        }
                    }
                }
            );
        }
    })
}

const generateResultComment = async (req, res) => {
    if (!req?.body) return res.status(400).json({ "message": "body parameters are required !" })

    const { xPoint, yPoint } = req.body // name for .png file

    if(typeof xPoint !== 'number') return res.status(400).json({"message": "xPoint must be a number !"})
    if(typeof yPoint !== 'number') return res.status(400).json({"message": "yPoint must be a number !"}) 

    const comment = await Comment.findOne({
        xPosition: xPoint,
        yPosition: yPoint
    }).exec()

    if(comment) {
        return res.json(comment.content)
    } 
    else {
        if(xPoint < 0 && yPoint > 0) {
            if(xPoint < -20 && yPoint > 20) {
                return res.json({"message": "TH 1"})
            }
            if(xPoint > -20 && yPoint > 20) {
                return res.json({"message": "TH 2"})
            }
            if(xPoint < -20 && yPoint < 20) {
                return res.json({"message": "TH 3"})
            }
            if(xPoint > -20 && yPoint < 20) {
                return res.json({"message": "TH 4"})
            }
        }

        if(xPoint < 0 && yPoint < 0){
            if(xPoint < -20 && yPoint > -20) {
                return res.json({"message": "TH 5"})
            }
            if(xPoint > -20 && yPoint > -20) {
                return res.json({"message": "TH 6"})
            }
            if(xPoint < -20 && yPoint < -20) {
                return res.json({"message": "TH 7"})
            }
            if(xPoint > -20 && yPoint < -20) {
                return res.json({"message": "TH 8"})
            }
        }

        if(xPoint > 0 && yPoint > 0) {
            if(xPoint < 20 && yPoint > 20) {
                return res.json({"message": "TH 9"})
            }
            if(xPoint > 20 && yPoint > 20) {
                return res.json({"message": "TH 10"})
            }
            if(xPoint < 20 && yPoint < 20) {
                return res.json({"message": "TH 11"})
            }
            if(xPoint > 20 && yPoint < 20) {
                return res.json({"message": "TH 12"})
            }
        }

        if(xPoint > 0 && yPoint < 0) {
            if(xPoint < 20 && yPoint > -20) {
                return res.json({"message": "TH 13"})
            }
            if(xPoint > 20 && yPoint > -20) {
                return res.json({"message": "TH 14"})
            }
            if(xPoint < 20 && yPoint < -20) {
                return res.json({"message": "TH 15"})
            }
            if(xPoint > 20 && yPoint < -20) {
                return res.json({"message": "TH 16"})
            }
        }
        
        if(xPoint === -20 && yPoint === 20){
            return res.json({"message": "TH 17"})
        }

        if(xPoint === -20 && yPoint === -20){
            return res.json({"message": "TH 18"})
        }

        if(xPoint === 20 && yPoint === 20){
            return res.json({"message": "TH 19"})
        }

        if(xPoint === 20 && yPoint === -20){
            return res.json({"message": "TH 20"})
        }
    }
}

module.exports = {
    generateResultImage,
    generateResultComment
}