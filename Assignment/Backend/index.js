const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs'); // To work with files  -> fs stands for File System -> a module in Node.js -> used to work with files -> read and write from files

//  common functions of fs module:
// 1. existsSync -> fs.existsSync(path) -> checks if the file exists ->returns true or false
// 2. readFileSync -> fs.readFileSync(path, encoding) -> reads the content of the file synchronously (encoding -> encoding to use when reading the file), common values are utf8, binary -> by default if we don't specify the encoding, this function returns buffer -> which is non readable , but when we use utf8 encoding -> it returns data in form of a json string
// 3.writeFileSync -> fs.writeFileSync(path, data, options) -> path -> the path of file where we want to write, 

app.use(cors())
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})

app.use(express.json()); // for parsing the application/json
// app.get('/signup', (req, res)=>{
//    res.send('hello');
// })

//  handling request on login:
let object = {};
app.post('/signup', (req, res) => {

    const newuser = req.body;

    let users = [];
    if (fs.existsSync('data.json')){
        //  if data.json exists -> read the data
        const fileContent = fs.readFileSync('data.json', 'utf8'); // returns string  -> technically a JSON string
        users = JSON.parse(fileContent);
    }

    //  Add the new user to the users array:
    users.push(newuser);

    // Write the updated array back to data.json
    fs.writeFileSync('data.json', JSON.stringify(users)); // the data.json in real has data in form of json string -> that's why we are writing the data in form of JSON string here
    // res.redirect('/dashboard');

    res.sendStatus(200);




})




app.get("/dashboard", (req, res)=>{
    let users = [];

    if (fs.existsSync('data.json')){
        const fileContent = fs.readFileSync('data.json', 'utf8');
        users = JSON.parse(fileContent);
    }
    // console.log(users);
    res.send(users);
})




let object2 = {};

// app.get('/login', (req, res)=>{
//     res.send("hello");
// })
app.post('/login', (req, res) => {
    // res.send("OKKKK")
    console.log("hello");
    const userinfo = req.body;
    console.log(userinfo);
    // res.send("hello");

    //  verification:
    //  access users data from data.json

    let users = [];
    if (fs.existsSync('data.json')){
        let fileContent = fs.readFileSync('data.json', 'utf8');
        users = JSON.parse(fileContent);
    }

    // let flag = false;
   

    users.forEach((item)=>{
        
        if (item.email == userinfo.email && item.password == userinfo.password){
            console.log("login success");
            res.sendStatus(200);
        }
     

    })
    
        res.sendStatus(400);
        console.log("login not success");
    

    
})
