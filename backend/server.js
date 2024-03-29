const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db')
const router = require('./routers')
const PORT = process.env.PORT || 5000

// db connection

db.connect();
// middleware 

app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))

app.use(express.json())

// cors header method

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Headers', "*")
    next()
})

// api

app.use('/api',router)

//static resouces

// app.use('/upload',express.static(path.join(__dirname,'/../uploads')))
// app.use(express.static(path.join(__dirname,'/../frontend/build')))

// app.get('*',(req,res)=>{
//     try {
        
//         res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
//     } catch (e) {
//         res.send('Oops! error occured')
//     }
// })

// cosrs

app.use(cors())

// server listening

app.listen(PORT,()=>{
    console.log(`Stackhelp running on port ${PORT}`)
    console.log(`${__dirname}`)
})