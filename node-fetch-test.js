// const fetch = require('node-fetch');

// fetch('https://api.henrikdev.xyz/valorant/v1/profile/Nimit2801/4619')
// .then( response => {
//     console.log('asd');
//     console.log(response);
// })

const axios = require('axios');

let valogamename = 'NImit2801';
let valogameid = '4619'; 
console.log(valogamename, valogameid);
axios.get(`https://api.henrikdev.xyz/valorant/v1/profile/${valogamename}/${valogameid}`)
.then( response => {
    console.log(response.data);
   // message.channel.send(response.data.user)
})
.catch( err => {
    console.log(err)
})