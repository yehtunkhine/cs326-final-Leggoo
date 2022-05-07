import express from 'express';
import { KajaDatabase } from './kaja-db.js';

class KajaServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('public'));
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.post('/user/create/:userID/:userName/:age/:email/:password', async (req, res) => {
      try {
        const { userID, userName, age, email, password } = req.query;
        const user = await self.db.createUser(userID, userName, age, email, password);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/read/:userID', async (req, res) => {
      try {
        const { userID } = req.query;
        const user = await self.db.getUser(userID);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.put('/user/update/:userID/:userName/:age/:email/:password', async (req, res) => {
      try {
        const { userID, userName, age, email, password } = req.query;
        const user = await self.db.updateUser(userID, userName, age, email, password);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.delete('/user/delete/:userID', async (req, res) => {
      try {
        const { userID } = req.query;
        const user = await self.db.deleteUser(userID);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/all', async (req, res) => {
      try {
        const user = await self.db.getAllUser();
        res.send(JSON.stringify(user));
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
      console.log(`PeopleServer listening on port ${port}!`);
    });
  }
}


//add DATABASEURL
const server = new KajaServer(process.env.DATABASE_URL);
server.start();
