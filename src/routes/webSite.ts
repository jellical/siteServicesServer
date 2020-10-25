import express from 'express'
import { add, get, update, query, where } from 'typesaurus'

import { webSites } from '../models/webSite'
import authChecker from '../middleware/checkAuthToken'
import { newTimestamp } from '../config/db'

const router = express.Router()

router.post('/api/websites', authChecker, async (req, res) => {

    try {
        const website = await add(webSites, {
            url: req.body.url,
            title: req.body.title,
            user: req.user.ref,
            isActive: true,
            timestamps: {
                created: newTimestamp,
                lastUpdated: newTimestamp
            }
        })

        const createdWebsite = await get(webSites,website.id)
        const {user, isActive, ...toreturn} = createdWebsite.data


        return res.status(200).send({
            id: createdWebsite.ref.id,
            ...toreturn
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({error:"Something went wrong"})
    }


})

router.get('/api/websites', authChecker, async (req, res) => {

    try {
        const sites = await query(webSites, [
            where('isActive', '==', true ),
            where('user', '==', req.user.ref)
        ])

        const arrayToReturn = sites.map((site)=>{
            const {user, isActive, ...toreturn} = site.data
            return {
                id: site.ref.id,
                ...toreturn
            }
        })


        return res.status(200).send(arrayToReturn)
    } catch (e) {
        console.log(e)
        return res.status(500).send({error:"Something went wrong"})
    }
})


router.get('/api/websites/:id', authChecker, async (req, res) => {
    try {
        const site = await get(webSites, req.params.id)

        if(site.data.user.id !== req.user.ref.id || !site) {
            return res.status(404).send({error:"Not found"})
        }

        return res.status(200).send(site)
    } catch (e) {
        console.log(e)
        return res.status(500).send({error:"Something went wrong"})
    }
})

router.patch('/api/websites/:id', authChecker, async (req, res) => {
    try {
        const site = await get(webSites, req.params.id)

        if(site.data.user.id !== req.user.ref.id || !site) {
            return res.status(404).send({error:"Not found"})
        }

        await update(webSites, req.params.id, {url:req.body.url})

        return res.status(200).send("Website successfully updated")
    } catch (e) {
        console.log(e)
        return res.status(500).send({error:"Something went wrong"})
    }
})



export default router