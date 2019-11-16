const express = require("express");
const engines = require("consolidate");
const fs = require("fs");
const path = require("path");
const app = express();

const users = [];


fs.readFile(path.join(__dirname, "../users.json"), "utf-8", (err, data) => {
    if(!err){
//        console.log(data);
        userData = JSON.parse(data);
        userData.forEach(user => {
            const username = user.name.title + ". " + user.name.first + " " + user.name.last;
            user.name.full = username;
            users.push(user);
        });
//        console.log(users);

    } else {
        console.log("Error: "+err);
    }
});


app.engine("hbs", engines.handlebars );
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

app.get('/', (req, res) => {
    res.render("index", {users})
})


app.get('/', (req, res) => {
    res.send("Yes welcome....");
});


app.get('/users', (req,res) => {

//    res.send({users});
    let listOfUsers = "<ul>";
    let userList = users.reduce((listString, user) => {
        return (listString +=
        "<li><a href='/" + user.username + "'>" + user.name.full + "</a></li>");
    }, "");

    listOfUsers += userList;
    listOfUsers += "</ul>";
    res.send(listOfUsers);
    
});


app.get('/:user', (req,res) => {
    res.send(req.params.user);
});





const server = app.listen(8080, () => {
    console.log("server started at port: " + server.address().port);
});