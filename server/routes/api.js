const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongodb = require('mongodb');
const User = require('../models/user.js');
const Event = require('../models/events.js');

mongoose.connect("mongodb://localhost:27017/users")

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token == 'null') {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token, 'token');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

route.get('/', (req, res) => {
    res.send('Obi-Wan Kenobi')
})

route.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error);
        }
        else {
            let payload = {subject: registeredUser._id};
            let token = jwt.sign(payload, 'token');
            res.status(200).send({token});
        }
    })
})

route.post('/login', (req, res) =>{
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {
        if(err) {
            console.log(err);
        } else {
            if(!user) {
                res.status(401).send('Invalid User');
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid Password')
            } else {
                let payload = {subject: user._id};
                let token = jwt.sign(payload, 'token');
                res.status(200).send({token});
            }
        }
    })
})

route.get('/special', verifyToken, (req, res) => {
    let events = [
        {
          "name": "Auto Expo",
          "description": "lorem ipsum"
        },
        {
          "name": "Auto Expo",
          "description": "lorem ipsum"        
        },
        {
          "name": "Auto Expo",
          "description": "lorem ipsum"
        },
        {
          "name": "Auto Expo",
          "description": "lorem ipsum"
        },
        {
          "name": "Auto Expo",
          "description": "lorem ipsum"
        },
        {
          "name": "Auto Expo",
          "description": "lorem ipsum"
        }
    ]

    res.json(events);
})


// route.post('/special/add', verifyToken, (req, res) => {
//     let eventData = req.body;
//     let event = new Event(eventData);
//     event.save((err, data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send({data: 'Record has been updated'});
//         }
//     })
// })

// route.put('/special/update', verifyToken, (req, res) => {
//     let eventData = req.body;
//     let event = new Event(eventData);
//     event.findByIdAndUpdate( req.body._id, { name: req.body.name, description: req.body.description }, (err, data) => {
//         if (err) {
//             res.send(err)
//         } else {
//             res.send({data: 'record has been updated'})
//         }
//     })
// })

// route.delete('/special/deleteEvent', verifyToken, (req, res) => {
//     Event.remove( { _id: req.body.id }, (err) => {
//         if (err) {
//             res.send(err)
//         } else {
//             res.send({data: 'Record has been deleted'})
//         }
//     })
// })


// route.get('/special', verifyToken, (req, res) => {
//     Event.find({}, (err, data) => {
//         if(err) {
//             res.send(err);
//         } else {
//             res.send(data);
//         }
//     })
// })

// route.post( '/special/add', verifyToken, (req,res) => {
    
//     console.log('three');
//     let event = new Event(req.body);
//     event.save()
//         .then(event => {
//             res.status(200).json({'event':'Added Successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('Failed to create new record');
//         });
// })


// route.put( '/special/update', verifyToken, (req,res) => {
    
//     console.log('four');
//     Event.findById(req.params.id, (err,event) => {
//         if (!event) {
//             return next(new Error('Could not load document'));
//         } else {
//             event.name = req.body.name;
//             event.description = req.body.description;
//             event.save()
//                 .then(event => {
//                     res.json(event);
//                 })
//                 .catch(err => {
//                     res.status(400).send('Update Failed');
//                 });
//         }
//     });
// })


// route.delete( '/special/delete', verifyToken, (req,res) => {
    
//     console.log('five');
//     Event.findByIdAndRemove({_id: req.params.id}, (err,event) => {
//         if (err) {
//             res.json(err);
//         } else {
//             res.json('Remove Successfully');
//         }
//     });
// })

// route.get( '/special', verifyToken, (req,res) => {
    
//     console.log('one');
//     Event.find((err,event) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(event);
//         }
//     });
// })

module.exports = route