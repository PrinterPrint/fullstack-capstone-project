# Skills Network steps 

## Finish Populating MongoDB

**Clone your repository** <br>
Go to import-mongo folder <br>
`cd /home/project/fullstack-capstone-project/giftlink-backend/util/import-mongo ` <br>

Duplicate the .env.sample file, naming the new file .env. <br> 
This file contains the username and password for MongoDB. <br>
MONGO_URL=mongodb://root:password_of_mongodb_instance@localhost:27017 <br>
Change localhost with IP address otherwise it could happen that it won't work. <br>

`npm install <br>`

select "MongoDB CLI" in Skills Network Lab and open a new terminal (directing to import-mongo folder). <br>

Select MongoDB CLI <br>
`show databases` <br>
`use giftdb` <br>
`show collections` <br>
`db.gifts.countDocuments()` --> result: 16 <br>
`db.gifts.find({category: 'Living Room'}).limit(2)` --> result: 2 objects: Coffe Table and Couch <br>
`db.gifts.find({id: '429'})` --> result: 1 object: Side Table <br>

## Introduction: Back-end APIs and Services
- Several APIs with appropriate endpoints.
- Middleware to handle requests from the front end.
- Integrate gift routes into the main Express application by configuring the middleware
- Express server performs sentiment analysis (anaylzes language to categorize the language as positive, negative, or neutral) by calling external service.

### Design and Implement Gift Listings
The gifts API handles the routes and endpoints for retrieving all gifts or specific gifts by their ID. <br>
connectToDatabase():
1) Connect to MongoDB
2) Assign database instance
3) Return the database instance

/api/gifts endpoint is implemented so it retrieves the gifts stored with a get() function. <br>
/api/gifts/:id

### Design and Implement Search API
The search API will contain the search endpoint that allows filtering gifts by name, category, condition, and age. <br>
searchRoutes.js
1) Connecting to MongoDB
2) Adding the name filter to the query
3) Adding other filters to the query such as category, condition, and age.
4) Fetching the filtered gifts
5) Integrating the search routes in the Express application
6) Importing searchRoutes
7) Using searchRoutes for the api/search path

### Build a Sentiment Analysis Service Lab
Express server that performs sentiment analysis by calling an external service.  Natural library using the node package manager (npm). <br>
1) Initialize an Express server with the necessary middleware
2) Create a POST /sentiment endpoint
3) Extract the sentence parameter from the request body
4) Call the external sentiment analysis service using Axios
5) Process the external service's response and return the analysis result
6) Implement error handling for the Axios request
7) Add logging for request processing and errors










