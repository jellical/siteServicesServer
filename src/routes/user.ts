import express from 'express'
import {add, get} from 'typesaurus'

import {users, User} from '../models/User'

// @ts-ignore
const router = new express.Router()

router.post('/api/user', async (req, res) => {
    try {
        const user = await add(users, { name: req.body.name, email: req.body.email, password:req.body.email } )

        return res.status(200).send(user);
    } catch (e) {
        console.log(e)
        return res.status(500).send({error:"Something went wrong"})
    }

    return res.status(400).send({error:"Provided registration type is not acceptable"})
})

router.get('/api/user/me', async (req, res) => {
    try {
        const user = await get(users, "ouLTsvJx9uIStvp9fzrP")
        return res.status(200).send(user.data);
    } catch (e){
        console.log(e)
    }
})


export default router
