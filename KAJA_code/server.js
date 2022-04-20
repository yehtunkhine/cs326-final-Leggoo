
import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

const app = express();
const port = 3000;
// const path = require('path');
const path = '/Users/khai/Desktop/cs326/kaja/milestone2/cs326-final-Leggoo/KAJA_code/';

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use('/static', express.static('public'));

// connect to homepage html
app.get('/', (req, res) => {
    res.sendFile(path + '/public/homePage.html');
});

// connect to login page html
app.get('/login', (req, res) => {
    res.sendFile(path +'/public/signIn.html');
    
});

// connect to profile page html
app.get('/profile', (req, res) => {
    res.sendFile(path + '/public/profile.html');
});

app.get('/register', (req, res) => {
    res.sendFile(path + '/public/Register.html');   
});



//const datafile = 'Data-Test.json';

const users = {};
const events = {};
// // home page
// app.get('/', (req, res) => {
//     res.sendFile('./public/homePage.html');
// });

// Create a new user with id and name
app.post('/create/user/:id/:name', (req, res) => {
    const user = req.params;
    users[user.id]= user;
    // Status 201: Created
    res.status(201).json(user);
});

// Get the user with id
app.get('/user/:id', (req, res)=> {
    const {id} = req.params;
    const user = users[id];
    if(user){
        res.json(user);
    }else{
        res.status(404).json({message: 'User ${id} not found'});
    }
});

// Delete a user profile with their id
app.delete('/delete/user/:id', (req, res) => {
    const {id} = req.params;
    const user = users[id];
    if(user){
        delete users[user];
    }
    else{
        res.status(404).json({message: 'User ${id} not found to delete.'});
    }
});

// getting all users
app.get('*', (req, res) => {
    res.status(404).json({message: 'Unknown Request'});
});

// Create a new event with id, date, time, capacity and category
app.post('/create/event/:id/:date/:time/:capacity/:category', (req, res) => {
    const event = req.params;
    events[event.id] = event;
    res.status(201).json(event);
});

// Get the event with event id
app.get("/event/:id", (req, res) => {
    const {id} = req.params;
    const event = event[id];
    if(event){
        res.json(event);
    }else{
        res.status(404).json({message: 'Unknown Request'});
    }
});



app.listen(port, () => {
    console.log("Application running on port " + port);
// /usr/bin/bash: q: command not found
});
