const express = require('express')
const router = express.Router()
const QuestionDB = require('../models/Question')


router.get('/:key',async(req,res)=>{
    let result = await QuestionDB.find({
        "$or":[
            {
                title:{$regex:req.params.key}
            },
            {
                tags:{$regex:req.params.key}
            }
        ]
    });
    res.send(result)
})

module.exports = router