const express = require('express');
const cors=require("cors");
const morgan = require("morgan");

const mongoose=require("mongoose"); //to connect to mongodb
const loginRouter=require("./RouteAPI/AuthenticationRoute");
const authMW=require("./Middlewares/Auth/AuthenticationMW");
//#region  require routers
const childsRouter = require("./RouteAPI/childRoute");
const classesRouter = require("./RouteAPI/classRoute");
const teachersRouter = require("./RouteAPI/teacherRoute");
//#endregion

const server = express(); //create server

//#region  connect ot db and start server
let connectionstring="mongodb://127.0.0.1:27017/Nursery"; 
mongoose.connect(connectionstring)
.then(()=>{
    console.log("Connected to db...");
    server.listen(process.env.PORT||8081,()=>{console.log("Listening on port 8081...");});
}).catch((error)=>console.log(error));
//#endregion

server.use(morgan("tiny"));
server.use(morgan("dev"));
server.use(cors());

server.use((req,res,next)=>{console.log(req.url , req.method); next(); });

server.use(express.json()); //to allow json data to be sent by client
server.use(express.urlencoded()); //to allow url encoded data(form) to be sent by client

//#region Login and authentication
server.use(loginRouter);
server.use(authMW);
//#endregion

//#region use routers
server.use(classesRouter);
server.use(childsRouter);
server.use(teachersRouter);
//#endregion

server.use((req,res)=>{res.status(404).json({data:"Not Found"});})
server.use((error,req,res,next)=>{res.status(error.status||500).json({data:"Error Msg : "+error});});
    




