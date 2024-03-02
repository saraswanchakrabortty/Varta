const express = require('express')
const router = express.Router()

const questionRouter = require('./QuestionRoute')
const answerRouter = require('./AnswerRoute')
const commentRouter = require('./CommentRoute')
const searchRouter = require('./SerachRoute')


router.get('/',(req,res)=>{
    res.send('welcome to stackhelp')
})

router.use('/question',questionRouter)
router.use('/answer',answerRouter)
router.use('/comment',commentRouter)
router.use('/search',searchRouter)

module.exports = router