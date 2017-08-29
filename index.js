var express = require("express");
var todo_db = require("./seed.js");
var bodyParser = require("body-parser");
var app = express();

// Logging the requests.
app.use("/", function(req, res, next){
    console.log(((new Date()).getTime()) + " " + req.method + " " + req.url);
    next();
});

// Server static files.
app.use("/", express.static(__dirname + "/public"));

app.use("/", bodyParser.urlencoded({extended: false}));

// Check if todo with the given id exists
app.use("/api/todos/:id", function(req, res, next){
    var id = req.params.id;
    var todo = todo_db.todos[id];
    if(!todo){
        res.status(400);
        res.json({error : "Todo doesn't exist"});
    }
    next();
});

//---------------------------------------------------------------------------------//
//----------------- RESTFull API'S ------------------------------------------------//
//---------------------------------------------------------------------------------//
// get all todos
// GET http://localhost:4000/todos
app.get("/api/todos", function (req, res) {
    res.json(todo_db.todos);
});

// add a todo
app.post("/api/todos", function(req, res){
    var todo = req.body.todo_title;
    if(!todo || todo==="" || todo.trim()===""){
        res.status(400).json({ error: "Todo title can't be empty"});
    }
    else{
        var new_todo_object = {
            title: todo,
            status: todo_db.statusENUMS.ACTIVE
        };
        todo_db.todos[todo_db.next_todo_id++] = new_todo_object;
        res.json(todo_db.todos);
    }
});

// get a todo
app.get("/api/todos/:id", function(req, res){
    var todo = todo_db.todos[req.params.id];
    res.json(todo);
});

// update a todo
app.put("/api/todos/:id", function(req, res){
    var todo = todo_db.todos[req.params.id];
    var todo_title = req.body.todo_title;

    if(todo_title && todo_title!=="" && todo_title.trim()!== ""){
        todo.title = todo_title;
    }

    var todo_status = req.body.todo_status;

    if(todo_status &&
        (todo_status===todo_db.statusENUMS.ACTIVE ||
            todo_status===todo_db.statusENUMS.COMPLETE ||
            todo_status===todo_db.statusENUMS.DELETED)
    ){
        todo.status = todo_status;
    }

    res.json(todo_db.todos);
});

// delete a todo
app.delete("/api/todos/:id", function(req, res){
    var todo = todo_db.todos[req.params.id];
    todo.status = todo_db.statusENUMS.DELETED;
    res.json(todo_db.todos);
});

//------------------------------------------------------------------------------------//
//----------------END OF RESTFULL API'S ----------------------------------------------//
//------------------------------------------------------------------------------------//

app.listen(4000, console.log("Listening on localhost:4000"));