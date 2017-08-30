var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var app = express();

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(morgan('combined'));
app.use("/", bodyParser.urlencoded({extended: false}));
app.use("/assets", express.static(__dirname + "/assets"));

app.get("/form", function(req, res){
    var form = fs.readFileSync(__dirname + "/assets/form.html", "utf8");
    res.send(form);
});

app.post("/submit", function(req, res){
    var currentDate = new Date();
    var arr = req.body.dob.split('-');
    var dob = new Date(arr[0], arr[1]-1, arr[2]);
    var days = parseInt((currentDate - dob)/86400000);
    res.render("submit",
        {
            "name": req.body.name,
            "dob": days
        });
});

app.listen(3000, console.log("listening on port 3000"));