import express, { Router } from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
const router = Router();

const User = mongoose.model('User')


router.post('/signup', async (req, res) => {
    console.log(req.body)

    try {
        const { email, password } = req.body;
        const user = new User({ email, password });

        const saved = await user.save();
        console.log(saved)
        let token = jwt.sign({ userId: saved._id }, MY_SECRET_KEY)
        res.send({ token });
    } catch (err) {
        res.status(422).send(err.message)
    }
})

router.post('/signin', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).send("User must provide email and password")
    }

    try {


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: "Email not found. " })
        }

        await (user as any).comparePassword(password)

        let token = jwt.sign({ userId: user._id }, MY_SECRET_KEY)
        res.send({ token });
    } catch (err) { 
        res.status(422).send(err.message)
    }
})

export default router;