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

//---------------------------------------------------------------------------------//
//----------------- RESTFull API'S ------------------------------------------------//
//---------------------------------------------------------------------------------//

//-------------------- GET API'S ------------------------------------------------//
// Get all todos
app.get("/api/todos", function (req, res) {
    res.json(todo_db.todos);
});

// Get all todos with status ACTIVE
app.get("/api/todos/active", function(req, res){
    var active_todos = [];
    for(var todo_id in todo_db.todos){
        if(todo_db.todos[todo_id].status === todo_db.statusENUMS.ACTIVE){
            active_todos.push(todo_db.todos[todo_id]);
        }
    }
    res.json(active_todos);
});

// Get all todos with status COMPLETED
app.get("/api/todos/completed", function(req, res){
    var active_todos = [];
    for(var todo_id in todo_db.todos){
        if(todo_db.todos[todo_id].status === todo_db.statusENUMS.COMPLETE){
            active_todos.push(todo_db.todos[todo_id]);
        }
    }
    res.json(active_todos);
});

// Get all todos with status DELETED
app.get("/api/todos/deleted", function(req, res){
    var active_todos = [];
    for(var todo_id in todo_db.todos){
        if(todo_db.todos[todo_id].status === todo_db.statusENUMS.DELETED){
            active_todos.push(todo_db.todos[todo_id]);
        }
    }
    res.json(active_todos);
});

// get a todo
app.get("/api/todos/:id", function(req, res){
    var id = req.params.id;
    var todo = todo_db.todos[id];
    if(!todo){
        res.status(400);
        res.json({error : "Todo doesn't exist"});
    }
    else {
        res.json(todo);
    }
});

//---------------------POST API'S---------------------------------------------------//
// add a Todo
app.post("/api/todos", function(req, res){
    var todo = req.body.todo_title;
    if(!todo || todo==="" || todo.trim()===""){
        res.status(400).json({ error: "Todo title can't be empty"});
    }
    else{
        todo_db.todos[todo_db.next_todo_id++] = {
            title: todo,
            status: todo_db.statusENUMS.ACTIVE
        };
        res.json(todo_db.todos);
    }
});

//----------------------PUT API'S--------------------------------------------------------//
// update a todo
app.put("/api/todos/:id", function(req, res){
    var id = req.params.id;
    var todo = todo_db.todos[id];
    if(!todo){
        res.status(400);
        res.json({error : "Todo doesn't exist"});
    }
    else {
        var todo_title = req.body.todo_title;

        if (todo_title && todo_title !== "" && todo_title.trim() !== "") {
            todo.title = todo_title;
        }

        var todo_status = req.body.todo_status;

        if (todo_status &&
            (todo_status === todo_db.statusENUMS.ACTIVE ||
                todo_status === todo_db.statusENUMS.COMPLETE ||
                todo_status === todo_db.statusENUMS.DELETED)
        ) {
            todo.status = todo_status;
        }

        res.json(todo_db.todos);
    }
});


// Change the status of todo to complete
app.put("/api/todos/complete/:id", function (req, res) {
    var id = req.params.id;
    var todo = todo_db.todos[id];
    if(!todo){
        res.status(400);
        res.json({error : "Todo doesn't exist"});
    }
    else {
        todo.status = todo_db.statusENUMS.COMPLETE;
        res.json(todo_db.todos);
    }
});

// Change the status of todo to DELETED
app.put("/api/todos/delete/:id", function (req, res) {
    var id = req.params.id;
    var todo = todo_db.todos[id];
    if(!todo){
        res.status(400);
        res.json({error : "Todo doesn't exist"});
    }
    else {
        todo.status = todo_db.statusENUMS.DELETED;
        res.json(todo_db.todos);
    }
});

//-----------------------DELETE API'S ---------------------------------------------//
// delete a todo
app.delete("/api/todos/:id", function(req, res){
    var id = req.params.id;
    var todo = todo_db.todos[id];
    if(!todo){
        res.status(400);
        res.json({error : "Todo doesn't exist"});
    }
    else {
        todo.status = todo_db.statusENUMS.DELETED;
        res.json(todo_db.todos);
    }
});

//------------------------------------------------------------------------------------//
//----------------END OF RESTFULL API'S ----------------------------------------------//
//------------------------------------------------------------------------------------//

app.listen(4000, console.log("Listening on localhost:4000"));