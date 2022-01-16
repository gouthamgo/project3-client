# for front-end

# npx create-react-app client

## add bootstrap in the index.html page


- Lets say we got components(reusable), scrrens(lets say these are the stable pages)

- through the menu to the right side - so add ml-auto class to the ul tag 


# Node server setup

- initialize the npm using init npm
- npm i express (backend framework)

- Lets make entry point for the application
- lets create server.js

- Npm i nodemon---> to restart the server automatically

# MongoDb connection

## use mongodb compass after creating a cluster

```
const mongoose = require("mongoose");

<!-- initialise the mongoose -->

var mongoURL = process.env.MONGOLAB_URI;
<!-- create a variable and throw the database url -->
<!-- use .env file for security -->

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});

<!--url parameter, saftey parameters  -->

var connection = mongoose.connection
<!-- connection variable  -->

connection.on('error', ()=>{
    console.log('Mongo DB connection failed');
})
<!-- callback functions -->

connection.on('connected', ()=>{
    console.log('Mongo DB connection worked');
})


module.exports = mongoose
<!-- export to use in the server.js -->

```


# first task --> Getting the rooms data from backend to frontend


- we need to have data in the mongodb 
- we do that using model and we add the data using nodejs to db

## room model

- initialise mongoose

- create  a schema

```
const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({

    name: {
        type:String,
        required: true
    },
    maxcount : {
        type:Number,
        required: true

    },

    phonenumber: {
        type:Number,
        required: true
    },

    rentperday: {
        type:Number,
        required: true
    },
    imageurls:[],
    currentbookings: [],
    type:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    }
},{
    timestamps: true,
    collection: 'rooms',
})

// making a model - collection name and schema  
const roomModel = mongoose.model('rooms', roomSchema)

module.exports = roomModel
```


# npm i router

- will make express router

- Make routes folder to create various routes

```
const express = require("express");
const router = express.Router();
// importing the express and creating the router package

// import mongodb data of the room model to fetch the data 
const Room = require("../models/room")
// api end-point -asyn and await functions 
router.get("/getallrooms", async (req, res) => {
   
     try {
          const rooms = await Room.find({}) // pass an empty object
          // to get all the rooms
          console.log(rooms);
     res.send(rooms)
     // return res.json({rooms});
     } catch (error) {
          return res.status(400).json({ message: 'something went wrong' });
     }

});

router.post("/getroombyid", async (req, res) => {

     const roomid= req.body.roomid
   
     try {
          const rooms = await Room.findOne({_id: roomid}) 
          console.log(rooms);
     res.send(rooms)
     // return res.json({rooms});
     } catch (error) {
          return res.status(400).json({ message: 'something went wrong' });
     }

});




// export to server as it is the entry for node application 
module.exports = router;
```



