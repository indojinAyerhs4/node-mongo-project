const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/User.js')

const server = express()
server.use(cors())
server.use(bodyParser.json())

// Connection with MongoDB

mongoose.connect('mongodb+srv://Shreya:Shreya%402004@mern.f9gmc9e.mongodb.net/').then(() => console.log('Connected to database')).catch((error) => console.log(error));

server.post('/register', async (req, res) => {
    try {
        const { fullName, userName, age, password } = req.body
        const userObj = new User({ fullName, userName, age, password })
        const userExist = await User.findOne({ userName })
        if (userExist) {
            return res.json({
                status: false,
                message: 'User already exist'
            })
        }
        await userObj.save()
        res.json({
            status: true,
            meassge: "Data inserted successfully!!"
        })
    }
    catch (error) {
        res.json(
            {
                status: false,
                message: `Error : ${error}`
            }
        )
    }
})

server.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body
        const userExist = await User.findOne({ userName })
        if (!userExist)
            return res.json({
                status: false,
                meassge: "User not found"
            })
        if (password !== userExist.password) {
            return res.json({
                status: false,
                meassge: "password does not match"
            })
        }
        res.json({
            status:true,
            meassge:"login successful!!"
        })
    }
    catch (error) {
        res.json(
            {
                status: false,
                message: `Error : ${error}`
            }
        )
    }
})


server.listen(4000, () => {
    console.log('Server started...');
})