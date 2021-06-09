console.log('client side js loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'loading...'
    message2.textContent = ''
    const address = search.value
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
    response.json().then((data) => {
        if(data.error){
            return message1.textContent = data.error
        }
        message1.textContent = data.forecast
        message2.textContent = data.location
    })
})
})
