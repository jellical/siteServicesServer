import express from 'express'
import path from 'path'

import './config/db'
import userRouter from './routes/user'

const app = express();


const port = process.env.PORT || 5000
export const server = app.listen(port, () =>{
    console.log(`Server is up and running on port ${port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(userRouter)

