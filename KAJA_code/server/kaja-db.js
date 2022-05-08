import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class KajaDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

async findUser(email) {
  try{
    if (await this.getAccLogin(email)) {
      return true;
    }
  }
  catch(err){
    return false
  }
}

async validatePassword(email, pwd) {
    if (await this.findUser(email) === null || this.findUser(email) === undefined) {
      return false;
    }
    if ((await this.getAccLogin(email)).includes(pwd)) {
      return false;
    }
    return true;
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
    create table if not exists acc (
        accID integer not null primary key,
        accName varchar(30) not null,
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
        category varchar(20) not null

      );
    `;
    const res = await this.client.query(queryText);
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }

  // CREATE a acc in the database.
  async createAcc(accID,accName,age,email,password) {
    const queryText =
      'INSERT INTO acc (accID, accName, age, email,password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const res = await this.client.query(queryText, [accID, accName, age, email, password]);
    return res.rows;
  }

  // READ a Acc from the database.
  async getAcc(accID) {
    const queryText = 'SELECT * FROM acc WHERE accID = $1';
    const res = await this.client.query(queryText, [accID]);
    return res.rows;
  }

  // READ Acc from email in the database
  async getAccLogin(email) {
    const queryText = 'SELECT email, password FROM acc WHERE email = $1';
    const res = await this.client.query(queryText, [email]);
    return res.rows;
  }

  // UPDATE a acc in the database.
  async updateAcc(accID, accName, age, email, passowrd) {
    const queryText =
      'UPDATE acc SET accName = $2, age = $3, email = $4, password = $5 WHERE accID = $1 RETURNING *';
    const res = await this.client.query(queryText, [accID, accName, age, email, passowrd]);
    return res.rows;
  }

  // DELETE a acc from the database.
  async deleteAcc(accID) {
    const queryText = 'DELETE FROM acc WHERE accID = $1 RETURNING *';
    const res = await this.client.query(queryText, [accID]);
    return res.rows;
  }

  // READ all people from the database.
  async getAllAcc() {
    const queryText = 'SELECT * FROM acc';
    const res = await this.client.query(queryText);
    return res.rows;
  }

  // READ all event created by a acc.
  async getAccEvent(accID) {
    const queryText = 'SELECT eventID FROM Event WHERE FK_accID = $1';
    const res = await this.client.query(queryText,[accID]);
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

    // DELETE a event from the database.
    async deleteEvent(eventID) {
        const queryText = 'DELETE FROM Event WHERE eventID = $1 RETURNING *';
        const res = await this.client.query(queryText, [eventID]);
        return res.rows;
    }

    // READ all people from the database.
    async getAllEvent() {
        const queryText = 'SELECT * FROM Event';
        const res = await this.client.query(queryText);
        return res.rows;
    }        
}
``
