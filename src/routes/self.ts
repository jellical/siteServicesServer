import express from 'express'
import { update } from 'typesaurus'
import bcrypt from 'bcrypt'

import { users } from '../models/user'
import authChecker from '../middleware/checkAuthToken'
import { newTimestamp } from '../config/db'

const router = express.Router()

router.get('/api/self', authChecker, async (req, res) => {
    return res.status(200).send(req.user)
})

router.patch('/api/self', authChecker, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedToBeChanged = ['firstName', 'lastName' , 'email', 'password']
    const isValidOperation = updates.every((update) => allowedToBeChanged.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password,8)
    }

    try {
        await update(
            users,
            req.user.ref.id,
            {
                ...req.body,
                'timestamps.lastUpdated': newTimestamp
            })

        return res.status(200).send("User successfully updated");
    } catch (e) {
        console.log(e)
        return res.status(500).send({error:"Something went wrong"})
    }
})

export default router