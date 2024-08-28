# Skills Network steps 

## Finish Populating MongoDB

**Clone your repository** <br>
Go to import-mongo folder <br>
`cd /home/project/fullstack-capstone-project/giftlink-backend/util/import-mongo <br>`

Duplicate the .env.sample file, naming the new file .env. This file contains the username and password for MongoDB. <br>
MONGO_URL=mongodb://root:password_of_mongodb_instance@localhost:27017 <br>

`npm install <br>`

select "MongoDB CLI" in Skills Network Lab and open a new terminal (directing to import-mongo folder). <br>

Select MongoDB CLI <br>
`show databases` <br>
`use giftdb` <br>
`show collections` <br>
`db.gifts.countDocuments()` --> result: 16 <br>
`db.gifts.find({category: 'Living Room'}).limit(2)` --> result: 2 objects: Coffe Table and Couch <br>
`db.gifts.find({id: '429'})` --> result: 1 object: Side Table <br>









