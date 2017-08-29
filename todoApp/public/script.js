console.log("Scripts.js loaded");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID = "todos_list_div";

// Add the server data to html
function add_todo_elements(id, todos_data_json){
    var parent = document.getElementById(id);
    parent.innerText = todos_data_json;
}

// get all the todos from server
function getTodosAJAX(){
    console.log("Get all the todos");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === RESPONSE_DONE){
            if(xhr.status === STATUS_OK){
                add_todo_elements(TODO_LIST_ID, xhr.responseText);
            }
        }
    }; // end of callback
    xhr.send(data = null);
}

function add_todo(){
    var todo_element = document.getElementById("new_todo_title");
    var todo_title = todo_element.value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if(xhr.readyState === RESPONSE_DONE){
            if(xhr.status === STATUS_OK){
                getTodosAJAX();
            }
        }
    };
    xhr.send("todo_title=" + todo_title);
}