
var list = document.getElementById("list");


firebase.database().ref('todos').on('child_added', function (data) {
    //create li with text node
    var li = document.createElement('li');
    var li_Text = document.createTextNode(data.val().value);
    li.appendChild(li_Text);
    li.setAttribute("class", "st1");


    //delete button
    var delBtn = document.createElement("button");
    var DelText = document.createTextNode("DELETE");
    delBtn.appendChild(DelText);
    delBtn.setAttribute("class", "btn");
    li.appendChild(delBtn);
    delBtn.setAttribute("id", data.val().key);
    delBtn.setAttribute("onclick", "deleteItem(this)");

    //Edit button
    var EditBtn = document.createElement("button");
    var EditText = document.createTextNode("UPDATE");
    EditBtn.appendChild(EditText);
    EditBtn.setAttribute("class", "btn1");
    li.appendChild(EditBtn);
    EditBtn.setAttribute("id", data.val().key);
    EditBtn.setAttribute("onclick", "EditItem(this)");



    list.appendChild(li);
})

function addTodo() {
    var todo_item = document.getElementById('todo-item');
    var database = firebase.database().ref('todos');
    var key = database.push().key;
    var todo =
    {
        value: todo_item.value,
        key: key,
    }

    database.child(key).set(todo);

    todo_item.value = "";
}

function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove();
}

function deleteAll() {
    firebase.database().ref('todos').remove();
    list.innerHTML = "";
}

function EditItem(e){

    var editValue=prompt("Enter edit value",e.parentNode.firstChild.nodeValue);
     var editTodo={
       value:editValue,
       key:e.id
   }
   firebase.database().ref('todos').child(e.id).set(editTodo);
    e.parentNode.firstChild.nodeValue=editValue;
}















// console.log(firebase.database)
