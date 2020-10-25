import express from 'express'
import path from 'path'

import './config/db'
import {User} from './models/user'

//routes
import userRouter from './routes/user'
import selfRouter from './routes/self'
import webSiteRouter from './routes/webSite'

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}


const app = express();

const port = process.env.PORT || 5000
export const server = app.listen(port, () =>{
    console.log(`Server is up and running on port ${port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(userRouter)
app.use(selfRouter)
app.use(webSiteRouter)
