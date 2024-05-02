// backend/routes/user.js
const express = require('express');  

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../mongodb.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const  { authMiddleware } = require("../middleware.js");



const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => { //
    console.log("In the singup")
    const { success } = signupBody.safeParse(req.body)
   console.log("In the succes",success)
   console.log("In the body",req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email invalid  / Incorrect inputs"
        })
    }
    console.log(req.body)
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    console.log("user data user created",user)
    const userId = user._id;
   

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    console.log("JWT_SECRET", JWT_SECRET);
    //const token = jwt.sign({ userId }, JWT_SECRET);   
    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

    // router.put("/update", authMiddleware, async (req, res) => {
    //     const { success } = updateBody.safeParse(req.body)
    //     if (!success) {
    //         res.status(411).json({
    //             message: "Error while updating information"
    //         })
    //     }

    //     await User.updateOne(req.body, {
    //         id: req.userId
    //     })

    //     res.json({
    //         message: "Updated successfully"
    //     })
    // })

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;