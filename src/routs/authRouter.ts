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

        const saved = await user.save()
        console.log(saved)
        let token = jwt.sign({ userId: saved._id }, MY_SECRET_KEY)
        res.send({ token });
    } catch (err) {
        res.status(422).send(err.message)
    }
})

export default router;