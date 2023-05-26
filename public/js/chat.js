const socket = io()

const messageForm = document.querySelector('.messageForm');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton=messageForm.querySelector('button') 
const messages = document.querySelector('#messages')
//templates

const messagesTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
    console.log(message)

    const html = Mustache.render(messagesTemplate, {
       message: message.text,
       createdAt: moment(message.createdAt).format('H:mm:ss a')
    })
    messages.insertAdjacentHTML('beforeend', html)
})



messageForm.addEventListener('submit', (e) => {
    e.preventDefault()


    const message = e.target.elements.message.value;

     

    socket.emit('sendMessage', message, (error) => {
        messageFormButton.removeAttribute('disabled')
        messageFormInput = ''
        messageFormInput.focus()
        if(error){
            return console.log(error)
        }

        console.log('Message delivered')
    })
   
    })


    const locationTemplate = document.querySelector('#message-template').innerHTML

    socket.on('locationMessage', (message) => {

        console.log(message.url)


    const html = Mustache.render(locationTemplate, {
      url:message.url,
      createdAt: moment(message.createdAt).format('H:mm:ss a')
    })
    messages.insertAdjacentHTML('beforeend', html)
})


 




const geoLocationBtn = document.querySelector('.geoLocation')

geoLocationBtn.addEventListener('click', () => {

    geoLocationBtn.setAttribute('disabled', 'disabled')
    if(!navigator.geolocation){
        return alert('Geo location is not supported in your browser')
    }


navigator.geolocation.getCurrentPosition((position) => {

    socket.emit('myLocation', {


        lat:position.coords.latitude,
        long:position.coords.longitude
    }, () => {
        geoLocationBtn.removeAttribute('disabled')
        console.log('location shared')
    })
})

})