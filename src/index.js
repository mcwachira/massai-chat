import express from 'express'
import path from ';path'
import dotenv from 'dotenv'
dotenv.config()

const port  = process.env.PORT || 8001

const app=  express()

//public path
const publicDirectorPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectorPath))


app.listen(port, () => {
    console.log(`Server is up at port ${port}`)
})