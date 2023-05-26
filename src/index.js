import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import http from 'http'
import {Server} from 'socket.io'
import { getDirname } from './utils/fileDirectory.js        '
dotenv.config()

const port  = process.env.PORT || 8001

const app =  express()

//enables us to create a new instance of the web server
const server = http.createServer(app)
const io = new Server(server)


const __dirname = getDirname(import.meta.url)
//public path
const publicDirectorPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectorPath))


io.on('connection', (socket) => {
    console.log('a user is connected')
})
server.listen(port, () => {
    console.log(`Server is up at port ${port}`)
})