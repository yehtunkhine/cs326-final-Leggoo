Users Object – has 5 fields: ID, Name, Age, Email, Password,
Event Object – has 5 fields: Name, Description, Date, Time, Roster, category 


/users/login - allows a user to login
	Takes the users email, password.

/create/user/:id/:email/:name/:age/:username/:password 
- allows for a user to make a login and register into the application. 
They will have a username, name, age, intersts, and my events.

/profile – this endpoint retrieves the users profile information, like there email, name, age, and etc.

/user/profile/change? – allows the user to change a aspect of their profile

/user/profile/delete - allows the user to delete their account

/events/feed - this endpoint retrieves the events that are upcoming 

/events/post?eventName=ice Skating&description=….&when=12/2/2022 15:00 
– allows the user to post an event to the feed

/events/myEvents/update?...=… - allows the user to change an event they posted

/events/myEvents – retrieves the events the user created

/events/myEvents/going – retrieves the events that the user plans to go to or is interested in going

/events/myEvents/delete?eventName=… - deletes the event the user created

/events/myEvents/notGoing?event=… - takes the event from the feed out of the users going list, essentially taking the user out of the roster of people going to that event

![API](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/45799ab03a9a5e584dc8311b937ebd57f8694647/API.jpg)

CLIENT INTERFACE
----------------

![Sign in (1)](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/2596e10abe1b69ed7cd29ec3463a236b2ac2ae3b/Sign%20in%20(1).png)
![Register (1)](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/2596e10abe1b69ed7cd29ec3463a236b2ac2ae3b/Register%20(1).png)
![Profile](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/2596e10abe1b69ed7cd29ec3463a236b2ac2ae3b/profile.png)
![Home Page (1)](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/2596e10abe1b69ed7cd29ec3463a236b2ac2ae3b/Home%20Page%20(1).png)
![My Event (1)]
![Chat box (1)](https://github.com/yehtunkhine/cs326-final-Leggoo/blob/13c4f414c37e698f2345f8810ffff5004b3d93a1/Chat%20box%20(1).png)
