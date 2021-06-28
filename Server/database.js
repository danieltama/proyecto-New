const { url } = require('inspector');
const mongoose = require('mongoose');

const URI = 'mongodb+srv://user1:Alondra321#@cluster0.nrxti.mongodb.net/TiendaAnamyDB?retryWrites=true&w=majority';


mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('BD conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;