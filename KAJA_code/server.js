import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

const app = express();
const port = 3000;
// const path = require('path');
const path = '/Users/yehtu/vsCode/326Project/cs326-final-Leggoo/KAJA_code/';

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

let users = {};
let events = {};

const UserJSON = 'user.json';
const EventJSON = 'event.json';

async function init(){
    try {
        // Check if the file exists.
        await access(UserJSON, constants.R_OK | constants.W_OK);
    } catch (err) {
        // File does not exist. Create it.
        await writeFile(UserJSON, '{}');
    }

    try {
        // Check if the file exists.
        await access(EventJSON, constants.R_OK | constants.W_OK);
    } catch (err) {
        // File does not exist. Create it.
        await writeFile(EventJSON, '{}');
    }
}

async function reload(filename){
    try{
        const data = await readFile(filename, {encoding:'utf8'});
        if(filename === UserJSON){
            users = JSON.parse(data);
        }else{
            events = JSON.parse(data);
        }
      } catch(err){
        if(filename === UserJSON){
            users = {};
        }else{
            events = {};
        }
      }
}

async function save(filename){
    try{
        let data = {};
        if(filename === UserJSON){
            data = JSON.stringify(users);
        }else{
            data = JSON.stringify(events);
        }
        await writeFile(filename,data,{encoding:'utf8'});
    }catch(err){
        console.log(err);
    }
}
// // home page
// app.get('/', (req, res) => {
//     res.sendFile('./public/homePage.html');
// });

// Create a new user with id and name
app.post('/create/user/:id/:name/:age/:email/:password', async (req, res) => {
    await reload(UserJSON);
    const user = req.params;
    users[user.id]= user;
    save(UserJSON);
    // Status 201: Created
    res.status(201).json(user);
});

// Get the user with id
app.get('/user/:id', async (req, res)=> {
    await reload(UserJSON);
    const {id} = req.params;
    const user = users[id];
    if(user){
        res.json(user);
    }else{
        res.status(404).json({message: 'User ${id} not found'});
    }
    save(UserJSON);
});


// Delete a user profile with their id
app.delete('/delete/user/:id', async (req, res) => {
    await reload(UserJSON);
    const {id} = req.params;
    const user = users[id];
    if(user){
        delete users[user];
    }
    else{
        res.status(404).json({message: 'User ${id} not found to delete.'});
    }
    save(UserJSON);
});

// getting all other unspecified routes
app.get('*', (req, res) => {
    res.status(404).json({message: 'Unknown Request'});
});

// Create a new event with id, date, time, capacity and category
app.post('/create/event/:id/:date/:time/:capacity/:category', async (req, res) => {
    await reload(EventJSON);
    const event = req.params;
    events[event.id] = event;
    save(EventJSON);
    res.status(201).json(event);

});

// Get the event with event id
app.get("/event/:id", async(req, res) => {
    await reload(EventJSON)
    const {id} = req.params;
    const event = event[id];
    if(event){
        res.json(event);
    }else{
        res.status(404).json({message: 'Unknown Request'});
    }
    save(EventJSON);
});



app.listen(port, () => {
    init();
    console.log("Application running on port " + port);
// /usr/bin/bash: q: command not found
});