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

