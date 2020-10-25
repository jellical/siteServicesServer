import express from 'express'
import { add, query, where } from 'typesaurus'
import { newTimestamp } from '../config/db'
import bcrypt from 'bcrypt'

import { users } from '../models/user'
import { authTokens } from '../models/authToken'
import authChecker from '../middleware/checkAuthToken'
import {webSites} from '../models/webSite'

const router = express.Router()

router.post('/api/users', async (req, res) => {

    if (!req.body.password || !req.body.email) {
        return res.status(400).send('Password and email are required')
    }

    const password = await bcrypt.hash(req.body.password,8)

    try {

        const existedUser = await query(users, [
            where('email', '==', req.body.email)
        ])

        if (existedUser[0]) {
            return res.status(400).send('User is already registered')
        }

        const user = await add(users,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password,
                timestamps: {
                    created: newTimestamp,
                    lastUpdated: newTimestamp
                }
            })

        const authToken = await add(authTokens,
            {
                user: user,
                isActive: true,
                timestamps: {
                    created: newTimestamp,
                    lastUpdated: newTimestamp
                }
            })

        return res.status(200).send({ user:user.id, token:authToken.id });
    } catch (e) {
        console.log(e)
        return res.status(500).send({error:"Something went wrong"})
    }
})

router.post('/api/user/login',  async (req, res) => {
    if (!req.body.password || !req.body.email) {
        return res.status(400).send('Password and email are required')
    }

    const password = await bcrypt.hash(req.body.password,8)

    try {
        const user = await query(users, [
                where('email', '==', req.body.email)
            ])


        if(!user[0]) {
            return res.status(404).send('User not found')
        }

        const match = await bcrypt.compare(req.body.password, user[0].data.password)


        if(!match){
            return res.status(404).send('Password is incorrect')
        }

        const authToken = await add(authTokens,
            {
                user: user[0].ref,
                isActive: true,
                timestamps: {
                    created: newTimestamp,
                    lastUpdated: newTimestamp
                }
            })

        return res.status(200).send({ user:user[0], token:authToken.id });
    } catch (e) {
        console.log(e)
        return res.status(500).send({error:"Something went wrong"})
    }
})

export default router
