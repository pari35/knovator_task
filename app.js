const express = require("express");
const user = require("./models/user");
const app = express()
const joi = require('joi')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config({ path: "./config/config.env" })
require('./db/conn')
const port = process.env.PORT || 4000
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const ensureAuthenticated = require("./utils/auth");
const postsSchema = require('./models/posts')
app.use(bodyParser.json())
const server = app.listen(port, () => {
    console.log('server is working on port',port);
})

app.post('/api/tasks/register', async (req, res, next) => {
    const schema = joi.object({
        fullName: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).alphanum().required()
    })
    const { error, value } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Bad request", error })
    }
    // next()
    const userModel = new user(req.body)
    userModel.password = await bcrypt.hash(req.body.password, 10)
    try {
        const response = await userModel.save()
        response.password = undefined
        return res.status(201).json({ message: 'success', data: response })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: e })
    }
})

app.post('/api/tasks/login', async (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).alphanum().required()
    })
    const { error, value } = schema.validate(req.body)

    try {
        const userData = await user.findOne({ email: req.body.email })
        if (!userData) {
            return res.status(401).json({
                message: 'Invalid username / password'
            })
        }

        const passwordAuth = await bcrypt.compare(req.body.password, userData.password)
        if (!passwordAuth) {
            return res.status(401).json({
                message: 'Invalid username / password'
            })
        }
        const tokenObject = {
            __id: userData.id,
            fullName: userData.fullName,
            email: userData.email
        }
        const jwtToken = jwt.sign(tokenObject, "secret", { expiresIn: '4h' })
        return res.status(200).json({ jwtToken, tokenObject })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: e })
    }
})

// post request for posts
app.post('/api/posts', ensureAuthenticated, async (req, res) => {
    try {
        const createPosts = await postsSchema.create(req.body);
        res.status(200).json({
            success: true,
            createPosts
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

// get post by id
app.get('/api/posts/:id', ensureAuthenticated, async (req, res) => {
    (req, res)
    try {
        const postList = await postsSchema.findById(req.params.id);
        res.status(200).json({
            success: true,
            postList
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

//put 
app.put('/api/posts/:id',ensureAuthenticated, async (req, res) => {
    try {
        const updatePost = await postsSchema.findByIdAndUpdate(req.params.id, req.body);
        res.status(500).json({
            success: true,
            updatePost
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete 
app.delete('/api/posts/:id',ensureAuthenticated, async (req, res) => {
    try {
        const deletedPost = await postsSchema.findByIdAndDelete(req.params.id, req.body);
        res.status(500).json({
            success: true,
            deletedPost
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/api/getPostsBylatLong', ensureAuthenticated, async (req, res) => {
    try {
        let coOrd = {
            lat : req.body.lat,
            long : req.body.long 
        }
        const postsByLatLong = await postsSchema.find(coOrd);
        res.status(200).json({
            success: true,
            postsByLatLong
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/api/totalCount', ensureAuthenticated, async (req, res) => {
    try {
        const totalPostsCount = await postsSchema.find();
        let activeCount = 0
        let inActiveCount = 0
    let totalPostsCountDetails =  totalPostsCount.map(t => {
        if(t.isActive ==1 ){
            activeCount ++
        }else if(t.isActive ==0){
            inActiveCount ++
        }
    }) 

let countDetails = {
    totalPostCount : totalPostsCount.length,
    activePosts : activeCount,
    inactivePosts  :inActiveCount
}    
        res.status(200).json({
            success: true,
            countDetails
        })
    } catch (e) {
        res.status(400).send(e)
    }
})