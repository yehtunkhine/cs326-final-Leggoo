import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class KajaDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    // Create a new Pool. The Pool manages a set of connections to the database.
    // It will keep track of unused connections, and reuse them when new queries
    // are needed. The constructor requires a database URL to make the
    // connection. You can find the URL of your database by looking in Heroku
    // or you can run the following command in your terminal:
    //
    //  heroku pg:credentials:url -a APP_NAME
    //
    // Replace APP_NAME with the name of your app in Heroku.
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });

    // Create the pool.
    this.client = await this.pool.connect();

    // Init the database.
    await this.init();
  }

  async init() {
    const queryText = `
    create table if not exists User (
        userID integer not null primary key,
        userName varchar(30) not null,
        age integer not null,
        email varchar(40) not null,
        password varchar(40) not null

      );

      create table if not exists Event (
        eventID integer not null primary key,
        eventName varchar(30) not null,
        date date not null,
        time time not null,
        capacity integer not null,
        category varchar(20) not null,

        FK_userID integer FOREIGNKEY REFERENCES User(userID)
      );
    


      insert into 
        User(userID, userName, age, email, password) 
      values 
        ('1', 'Artemis', 19, 'artemis@umass.edu', 'blahblah'),
        ('2', 'Parzival', 17, 'parzival@umass.edu', 'cantrmb'),
        ('3', 'John', 30, 'john@umass.edu', 'idktoo'),
        ('4', 'Mia', 22, 'mia@umass.edu', 'whatthehell');
    `;
    const res = await this.client.query(queryText);
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }

  // CREATE a user in the database.
  async createUser(userID,userName,age,email,password) {
    const queryText =
      'INSERT INTO User (userID, userName, age, email,password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const res = await this.client.query(queryText, [userID, userName, age, email, password]);
    return res.rows;
  }

  // READ a user from the database.
  async getUser(userID) {
    const queryText = 'SELECT * FROM User WHERE userID = $1';
    const res = await this.client.query(queryText, [userID]);
    return res.rows;
  }

  // UPDATE a user in the database.
  async updateUser(userID, userName, age, email, passowrd) {
    const queryText =
      'UPDATE User SET userName = $2, age = $3, email = $4, password = $5 WHERE userID = $1 RETURNING *';
    const res = await this.client.query(queryText, [userID, userName, age, email, passowrd]);
    return res.rows;
  }

  // DELETE a user from the database.
  async deleteUser(userID) {
    const queryText = 'DELETE FROM User WHERE userID = $1 RETURNING *';
    const res = await this.client.query(queryText, [userID]);
    return res.rows;
  }

  // READ all people from the database.
  async allUser() {
    const queryText = 'SELECT * FROM User';
    const res = await this.client.query(queryText);
    return res.rows;
  }

  // READ all event created by a user.
  async getUserEvent(userID) {
    const queryText = 'SELECT eventID FROM Event WHERE FK_userID = $1';
    const res = await this.client.query(queryText,[userID]);
    return res.rows;
  }

    // CREATE a event in the database.
    async createEvent(eventID,eventName, date, time, capacity, category) {
        const queryText =
        'INSERT INTO Event (eventID, eventName, date, time, capacity, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const res = await this.client.query(queryText, [eventID, eventName, date, time, capacity, category]);
        return res.rows;
    }

    // READ a event from the database.
    async getEvent(eventID) {
        const queryText = 'SELECT * FROM Event WHERE eventID = $1';
        const res = await this.client.query(queryText, [eventID]);
        return res.rows;
    }

    // UPDATE a event in the database.
    async updateEvent(eventID, eventName, date, time, capacity, category) {
        const queryText =
        'UPDATE Event SET eventName = $2, date = $3, time = $4, capacity = $5, category = $6 WHERE eventID = $1 RETURNING *';
        const res = await this.client.query(queryText, [eventID, eventName, date, time, capacity, category]);
        return res.rows;
    }

    // DELETE a user from the database.
    async deleteEvent(eventID) {
        const queryText = 'DELETE FROM Event WHERE eventID = $1 RETURNING *';
        const res = await this.client.query(queryText, [eventID]);
        return res.rows;
    }

    // READ all people from the database.
    async allEvent() {
        const queryText = 'SELECT * FROM Event';
        const res = await this.client.query(queryText);
        return res.rows;
    }        
}



new user = yetun

yetun.getUserEvent(userID)
[01,02,03,04]
for loop
eventdata  = getEvent(01)
[01,eventname,balh, baoh]
new kaja = new Event(01,eventname, blah, blah)

kaja.name
kaja.id

