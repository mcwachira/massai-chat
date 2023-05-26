import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import http from 'http'
import {Server} from 'socket.io'
import Filter from 'bad-words'
import { getDirname } from './utils/fileDirectory.js        '
import { formatMessage , formatLocation } from './utils/messageFormat.js'
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

 
        const welcomeMessage = 'welcome to the chat app'
        socket.emit('message',formatMessage('welcome to the chat app'))

        //will send a message to  all existing user other than the new user
        socket.broadcast.emit('message',formatMessage('n new user has joined' ))

        socket.on('message', (inputValue ,callback) => {
        
            const filter =new Filter()

            if(filter.isProfane(inputValue)){
                return callback('profanity is not allowed')
            }
   io.emit('message', formatMessage(inputValue))

   callback()
})

socket.on('myLocation', (location , callback) => 
{
    console.log(location)
   io.emit('locationMessage', formatLocation( `https://google.com/maps?q=${location.lat},${location.long}`) )
   callback()
})

// socket.on('disconnect', () => {
//     io.emit('a user has left the building')
// })


    })


server.listen(port, () => {
    console.log(`Server is up at port ${port}`)
})


