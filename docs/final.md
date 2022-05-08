LEGGOO (Team #14)
-----------------
App: Kaja 가자
Semester: Spring 2022

|  Ye Tun Khine   |  yehtunkhine |
|-----------------|--------------|
|  Khai Wai       |  KhaiWai     |
|  Yuki Thane     |  YukiThane   |
|  Victor Vuong   |  vuongkv     |

Kaja app is an event specific app for UMass students to connect and meet up. Whether it is a casual hangout trying new restaurants, having a picnic, or an outdoor activity meetup, all these events can be posted, shared and notified to anyone on the platform. Like any other social media applications, Kaja has features for making an account like sign up and log in with the homepage easily navigable with the navigation bar that includes all that can be done on the app. Users will have their own profile page where the events they have added can be seen. The main feed includes all events searchable. Users can also create their own events and publish them on the main feed.  This is innovative in a way where most event websites and apps we have now for this area do not have the ability for individual students to connect since it is always organized by some groups. This app allows both individuals and groups to be able to organize events whether they are formal or casual.

UI
---

| UI view      | Purpose |
|--------------|-----------|
| Sign up/ Log in  | For a person to have access to the rest of the application,  you need an account. This sign up and login page is made specifically for umass students.  | 
| Home page and feed	  | This is the first page the user sees after signing up or logging in. This includes a news feed where all the events by all users are and the navigation bar that has all the other functions of the app | 
| Profile	  | This is the user profile where the user can view their information.   | 
| Create event	  | This page is for any user on the platform to be able to create an event.   | 
| My events  | This shows the events created specifically by the user unlike the feed.  | 
|  Chat      |  This feature enables the users to communicate in forms of chat for more information about the events that they added. |

Sign up/ Log in ![signupLoginPage.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/bcfc72d4e378ea9adca8e2d9512cd4ccebda344d/signupLoginPage.png)
Homepage and feed ![homePage.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/bcfc72d4e378ea9adca8e2d9512cd4ccebda344d/homePage.png)
Profile ![userProfile.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/bcfc72d4e378ea9adca8e2d9512cd4ccebda344d/userProfile.png)
Create event ![eventCreator.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/bcfc72d4e378ea9adca8e2d9512cd4ccebda344d/eventCreator.png)
My events ![myEvents.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/bcfc72d4e378ea9adca8e2d9512cd4ccebda344d/myEvents.png)
Chat ![chatBox.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/bcfc72d4e378ea9adca8e2d9512cd4ccebda344d/chatBox.png)

API
----
![updatedAPI.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/5643675175d045b7f6eaf62742f8380ba7ede24b/updatedAPI.png)


DATABASE
--------

|  Database code   |  Descriptions  |
|-----------------|--------------|
| ![dbtbl1.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/80f1553cd343173a92741aa740354174a9fee36a/dbtbl1.png) | This is the user table that is updated whenever there is a new user with sign up/log in credentials. The user table has 5 attributes: userID, userName, age, email, and password. The primary key for this table is set for userID as it is unique and will be used in a one to many (1:M) relationship with the event table. All the attributes are set to not null since the absence of one of these rows will disrupt in making a complete profile of a user. Several attributes like userName, email and password were set to a character limit to 30, 40 and 40 respectively.   |
| ![dbtbl2.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/80f1553cd343173a92741aa740354174a9fee36a/dbtbl2.png) |  This is the Event table that keeps track of the events created by users. It has 6 attributes: eventID, eventName, data, time, capacity and category with the primary key set to eventID and foreignKey for this table referencing the primary key on the user table. This is to establish the 1:M relationship with the idea that one user can create many events, but each event can only have one creator/owner although other users can join.  |
|  ![db3.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/80f1553cd343173a92741aa740354174a9fee36a/db3.png)  |  This is just a test for the database that we created. This is no longer in the final project code.    |

ROUTING
-------
![userEvent.png](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/5643675175d045b7f6eaf62742f8380ba7ede24b/userEvent.png)

|  URL routes/mappings  |    |
|-----------------|--------------|
|  /user/create/:userID/:userName/:age/:email/:password  | creating a new user with id, name, age, email and password  |
|  /user/read/:userID  |  getting a user information with user id  |
|  /user/update/:userID/:userName/:age/:email/:password    |  updating the user information with id, name, age, email and password  |
| /user/delete/:userID  |  deleting a user with a user id  |
|/user/all   |  getting all the users from the database |
| /event/create/:eventID/:eventName/:date/:time/:capacity/:category  |  creating an event with id, name, date, time, capacity and category |
| /event/read/:eventID  |  getting an event with an event id |
| /event/update/:eventID/:eventName/:date/:time/:capacity:/category | updating and event with id, name, date, time, capacity and category|
| /event/delete/:eventID   | deleting an event with an id|
|  /event/all  | getting all of the events|

AUTHENTICATION AND AUTHORIZATION
---------------------------------

We included the auth.js file under our server folder,
- we tried to authenticate username and password and tested with the json data. We authenticate and check first if a user id is present in our user database. 
- If a user is present, we tried to check if their input passwords match correctly to the password in the database. 
- We haven’t figured out how to connect to the actual database we have due to time limitations.
- Our authentication works with json data but not with database.
- We have a slight problem in package.json dependencies that we are having error running the npm start. 
- The heroku deployment was not successful. 
- Heroku Link - https://kaja-cs326final.herokuapp.com/

DIVISION OF LABOR
------------------

Ye Tun Khine - Implemented the sql modification server side kaja-db.js / server.js, Implemented the sql modification client side crud.js / index.js, Added an HTML for createEvent page together with css, Connect database on Heroku and deploy application.
  
Khai Wai - Implemented the Restful API for CRUD operations. Attempted to connect authentication and database. Contributed in final.md, milestone3.md and setup.md. Participated in the video presentation. 

Yuki Thane - Did the API schema for CRUD, Added the chat box feature, made blueprints for UI parts of the application, hand drew the logo for the app as seen on the sign up/log in page, edited presentation video and uploaded it 

Victor Vuong - did the API documentation, implemented the auth of the sign in login. 

CONCLUSION
-----------
We got a great opportunity to work with the team and spend time figuring out how to connect codes. Although our app is not perfect and complete yet, we decided to work on polishing the project during our summer break. The biggest challenge was deciding the time to meet up for the teammates. Another challenge was connecting front-end, back-end and middleware to make it work as a one project. We personally find the back-end part of the project the hardest and it would be great if we had more time on the lecture about connecting to databases, deployment and authentication. Overall, we made the project as cohesive as possible in terms of visual as well as code despite the differences we had in the beginning.
