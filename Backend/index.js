
const express= require('express');
const cors = require('cors');


const app = express();//creating an express app which contains all the express functionalities like get,post,put,delete etc


//cors is used to allow cross origin requests which are not allowed by default in express 
//It means that if you are running your frontend on localhost:3000 and your backend on localhost:5000, 
//then you need to use cors to allow requests from localhost:3000 to localhost:5000

app.use(cors());        // always use cors before using the json parser

app.use(express.json());
const mainRouter = require('./routes/index.js');

app.use('/api/v1/', mainRouter);







app.listen(3000,()=>{
    console.log(`Server is running on port ${3000}`);//starting the server on port 3000
})




