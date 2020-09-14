import express, { Router } from 'express'

const router = Router();
 

router.post('/signup', (req, res) => {
    console.log(req.body)
    res.send("you made a post");
})

export default router;