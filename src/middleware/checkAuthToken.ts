import { query, where, get } from 'typesaurus'

import { authTokens } from '../models/authToken'
import { users } from '../models/user'

export default async (req, res, next) => {

    try {

        const getToken = () => {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null
        }

        const tokenFromReq = getToken()

        if (!tokenFromReq) {
            return res.status(401).send({ error: "No authentication token provided" })
        }

        const authToken = await query(authTokens, [
            where('__name__', '==', tokenFromReq ),
            where('isActive', '==', true)
        ])

        if (!authToken[0]) {
            return res.status(401).send({error:"Authentication token is incorrect of expired"})
        }

        const userId = authToken[0].data.user.id

        const user = await get(users, userId)

        if (!user) {
            return res.status(500).send({error:"User token is valid yet we could not find the user"})
        }

        const userDataToReturn = user
        delete userDataToReturn.data.password

        req.user = userDataToReturn

        return next()

    } catch (e) {
        return next(e)
    }

};