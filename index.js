const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

require("dotenv").config()

app.use(express.json())

const posts = [
    {
        username: 'vi',
        title: 'Post 1'
    },
    {
        username: 'hong',
        title: 'Posts 2'
    }
]

app.get('/posts', authenticateToken, (req,res) =>{
    res.json(posts.filter(posts => posts.username === req.user.name))
})

app.post('/login',(req,res) => {
    //autherticate user
    const username = req.body.username
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) res.send.status(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.send.status(403)
        req.user = user
        next()
    })

}

app.listen(3000)