const colors = require('colors');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//swager stuff
const swaggerJsDoc =require("swagger-jsdoc");
const swaggerUi =require("swagger-ui-express");
//swager stuff
//const errorHandler=require('./middleware/error.js');
const fileupload = require('express-fileupload');
const path = require('path');
//loading env vars
const configFilePath = './config/config.env'
dotenv.config({path:configFilePath});
//loading env vars

//connecting to db
const connectDB =require('./config/db.js')
connectDB();

//connecting to db

//bring in the route files
const vehicleRoutes =require('./routes/Vehicle.js');
const personRoutes =require('./routes/Person.js');
const authRoutes =require('./routes/auth.js');
const users = require('./routes/user');
const crimeRoutes = require('./routes/crime');
//bring in the route files


//creating and runing the app 
const app =express();
    
    //body parser
app.use(express.json());
    //body parser
    
    //configur swager

const swaggerOptions = {
        swaggerDefinition: {
          info: {
            version: "1.0.0",
            title: "Backend",
            description: "backend mte3 stage",
            contact: {
              name: "sakka"
            },
            servers: ["http://localhost:5000"]
          }
        },
        // routes
    apis: ['./routes/*.js']
}; 
    
const swaggerDocs = swaggerJsDoc(swaggerOptions);

    //configur swager

    // dev lgging middleware
if(process.env.NODE_ENV==='development'){

    //logger in dev mode 
    app.use(morgan('dev'));
    //logger in dev mode 
}
    // dev lgging middleware

    // File uploading
app.use(fileupload());
    // File uploading

    //set static folder
app.use(express.static(path.join(__dirname,'public')));
    //set static folder

    // mount routes
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //mounting our swager ui route
app.use('/api/v1/vehicles', vehicleRoutes);// mounting vehicles routes
app.use('/api/v1/persons', personRoutes);// mounting person routes
app.use('/api/v1/auth', authRoutes);// mounting auth routes
app.use('/api/v1/users', users); // mounting user routes
app.use('/api/v1/crimes', crimeRoutes); // mounting crimes routes
//app.use(errorHandler);
    //mount routes

const PORT = process.env.PORT || 5000;
const server=app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode , on port  ${PORT}`.yellow.bold)
);

    // handel rejections and promise rejections
process.on('unhandledRejection',(err,promise)=>{

    console.log(`error : ${err.message}`.red)
    
    //close server and exist process
    server.close(()=>process.exit(1));
    //close server and exist process

})    
    // handel rejections and promise rejections
//creating and runing the app 