import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import auth from './auth.js';
import { KajaDatabase } from './kaja-db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

class KajaServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(expressSession(sessionConfig));
    this.app.use('/', express.static('public'));
    this.auth.configure(app);
  }
  
  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    function checkLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
        // If we are authenticated, run the next route.
        next();
      } else {
        // Otherwise, redirect to the login page.
        res.redirect('public/signIn.html');
      }
    }
    app.get('/', checkLoggedIn, (req, res) => {
      res.send('public/homePage.html');
    });

    app.get('/login', (req, res) =>
      res.sendFile('public/login.html', { root: __dirname })
    );

    app.post(
      '/login',
      auth.authenticate('local', {
        // use username/password authentication
        successRedirect: '/public/homePage.html', // when we login, go to /private
        failureRedirect: '/login', // otherwise, back to login
      })
    );

    app.post('/register', (req, res) => {
      const {accID, accName, age, email, password } = req.body;
      if (KajaDatabase.createAcc(accID, accName, age, email,  password)) {
        res.redirect('public/signIn.html');
      } else {
        res.redirect('public/Register.html');
      }
    });

    app.get('/register', (req, res) =>
      res.sendFile('public/Register.html', { root: __dirname })
    );

    this.app.post('/acc/create/:accID/:accName/:age/:email/:password', async (req, res) => {
      try {
        const { accID, accName, age, email, password } = req.query;
        const acc = await self.db.createacc(accID, accName, age, email, password);
        res.send(JSON.stringify(acc));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/acc/read/:accID', async (req, res) => {
      try {
        const { accID } = req.query;
        const acc = await self.db.getAcc(accID);
        res.send(JSON.stringify(acc));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.put('/acc/update/:accID/:accName/:age/:email/:password', async (req, res) => {
      try {
        const { accID, accName, age, email, password } = req.query;
        const acc = await self.db.updateAcc(accID, accName, age, email, password);
        res.send(JSON.stringify(acc));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.delete('/acc/delete/:accID', async (req, res) => {
      try {
        const { accID } = req.query;
        const acc = await self.db.deleteAcc(accID);
        res.send(JSON.stringify(acc));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/acc/all', async (req, res) => {
      try {
        const acc = await self.db.getAllAcc();
        res.send(JSON.stringify(acc));
      } catch (err) {
        res.status(500).send(err);
      }
    });


    this.app.post('/event/create/:eventID/:eventName/:date/:time/:capacity/:category', async (req, res) => {
        try {
          const { eventID, eventName, date, time, capacity, category } = req.query;
          const event = await self.db.createEvent(eventID, eventName, date, time , capacity, category);
          res.send(JSON.stringify(event));
        } catch (err) {
          res.status(500).send(err);
        }
      });
  
      this.app.get('/event/read/:eventID', async (req, res) => {
        try {
          const { eventID } = req.query;
          const event = await self.db.getEvent(eventID);
          res.send(JSON.stringify(event));
        } catch (err) {
          res.status(500).send(err);
        }
      });
  
      this.app.put('/event/update/:eventID/:eventName/:date/:time/:capacity:/category', async (req, res) => {
        try {
          const { eventID, eventName, date, time, capacity, category } = req.query;
          const event = await self.db.updateEvent(eventID, eventName, date, time, capacity, category);
          res.send(JSON.stringify(event));
        } catch (err) {
          res.status(500).send(err);
        }
      });
  
      this.app.delete('/event/delete/:eventID', async (req, res) => {
        try {
          const { eventID } = req.query;
          const event = await self.db.deleteEvent(eventID);
          res.send(JSON.stringify(event));
        } catch (err) {
          res.status(500).send(err);
        }
      });
  
      this.app.get('/event/all', async (req, res) => {
        try {
          const event = await self.db.getAllEvent();
          res.send(JSON.stringify(event));
        } catch (err) {
          res.status(500).send(err);
        }
      });
  }

  async initDb() {
    this.db = new KajaDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`KajaServer listening on port ${port}!`);
    });
  }
}


//add DATABASEURL
const server = new KajaServer(process.env.DATABASE_URL);
server.start();
