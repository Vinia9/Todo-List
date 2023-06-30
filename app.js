//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector(".filter-todo")

//Functions
addTodo = (event) =>{
    //Prevent form from submiting
    event.preventDefault()
    //Todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")
    //Create LI
    const newTodo = document.createElement('li')
    newTodo.innerHTML = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    //ADD TODO to Local Storage
    saveLocalTodos(todoInput.value)
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    //CHECK trash BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    //APPEND TO LIST
    todoList.appendChild(todoDiv)
    //clear Todo INPUT VALUE
    todoInput.value = ""
}

//delete functionality
deleteCheck = (e) =>{
    //targeting the list
    const item = e.target
    //DELETE TODO
    if(item.classList[0] ==='trash-btn'){
        const todo = item.parentElement
        //Animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend',function(){
            todo.remove()
        })
    }

    //CHECK MARK
    if(item.classList[0] ==='complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}

filterTodo = (event) =>{

    const todos = todoList.childNodes
    todos.forEach(function(todo){
    console.log(todos)
        // if(index>0){
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex"
                break
            case "completed":
                if (todo.classList.contains("completed")){
                        todo.style.display = "flex"
                }else{
                        todo.style.display = "none"
                    }
                break
            case "uncompleted":
                if(!(todo.classList.contains('completed'))){
                    todo.style.display = "flex"
                 }else{
                    todo.style.display = "none"
                }
                break
               }
            //}
            })
            
        }

//store in local storage
saveLocalTodos = (todo) =>{
    // console.log(todo)
    //CHECK ---HEY Do I already have todo in there?
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
        // console.log(todos)
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}

getTodos = () => {
    //CHECK ---HEY Do I already have todo in there?
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
        // console.log(todos)
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement('div')
        todoDiv.classList.add("todo")
        //Create LI
        const newTodo = document.createElement('li')
        newTodo.innerHTML = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton)
        //CHECK trash BUTTON
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton)
        //APPEND TO LIST
        todoList.appendChild(todoDiv)
    })
}

removeLocalTodos = (todo) =>{
    //CHECK ---HEY Do I already have todo in there?
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
        // console.log(todos)
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    //Updating the localStorage
    localStorage.setItem("todos",JSON.stringify(todos))
}





//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener('click', filterTodo)


  