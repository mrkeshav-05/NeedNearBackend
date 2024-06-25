import dotenv from 'dotenv';
import {app} from './app.js';
import connectDB from './database/index.js';


dotenv.config({ path: './.env'});

connectDB()
  .then(()=>{
    app.on('error', (error)=>{
      console.log("Error connecting to database : " + error)
      throw error;
    })
    app.listen(process.env.PORT || 8000, ()=>{
      console.log('Server is running on port: ' + process.env.PORT)
      console.log("http://localhost:", process.env.PORT || 8000)
    });
  })
  .catch((error)=>{
    console.log("MongoDB database connection failed!!!: " + error)
    throw error;
  })
// /Users/keshavthakur/Desktop/NeedNear/server/index.js
