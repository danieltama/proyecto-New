const express = require('express');
const router = express(); 
const passport = require('passport');

router.all("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS HEAD');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

const User = require('../models/User');
const usuarios = require('../controllers/usuarios.controllers');

const jwt = require('jsonwebtoken');
const { db, collection } = require('../models/User');




router.get('/', (req, res) => res.send('Hola Mundo'))

router.post('/registro', async (req, res) => {
    const { username, password} = req.body;
    const newUser = new User ({username, password});
    await newUser.save();
    
    const token = jwt.sign({_id: newUser._id}, 'secretkey')

    res.status(200).json({token})
})

router.post('/sesion', async (req, res) => {
    
    const { username, password } = req.body;
    const user = await  User.findOne({username})
    if (!user) return res.status(401).send("El usuario no existe");
    if (user.password !== password) return res.status(401).send('Contraseña Erronea');

    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token});
});

router.get('/users', (req, res) => {
    db.collection('users').find().toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
});


/*router.put('/user/:id', (req, res) => {
    collect = db.collection('users')
    User.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                username: req.body.username,
                password: req.body.password                
            }
        },
        {
            upsert: true
        },
        console.log("echo")
    ).then(result => { res.json('Usuario Actualizado') })
        .catch(error => console.error(error))
});*/

router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const usuario = {
        username: req.body.username,
        password: req.body.password
    };
    await User.findByIdAndUpdate(id, {$set: usuario}, {new: true});
    res.json({status: 'Usuario Actualizado'});
})

router.delete('/users/:id', (req, res) => {
    collec= db.collection('users')
    collection.deleteOne(
        { username: req.params.id }
    )
        .then(result => {
            res.json('Deleted user')
        })
        .catch(error => console.error(error))

});



module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization){
        return res.status(401).send('Autorizacion requerido');
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Autorizacion requerido');
    }

    const palyload = jwt.verify(token, 'secretkey')
    req.userId = palyload._id;
    next();
}