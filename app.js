//This is the first Javascript project

// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all Event Listeners
loadEventListeners()
// Load all event listeners
function loadEventListeners(){
    // DOM load Event
    document.addEventListener('DOMContentLoaded',getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    //Remove task Event
    taskList.addEventListener('click', removeTask);
    // Clear task button
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //  create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content'
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // Append the link to the li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    })
}


//Add Task
function addTask(e){
    if (taskInput.value === ''){
        alert('Add task');
    }
    // Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    // create textnode and append to child
    li.appendChild(document.createTextNode(taskInput.value));
    // create a new link element
    const link = document.createElement('a')
    //Add class
    link.className = 'delete-item secondary-content';
    // Add Icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    // store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    // clear input
    taskInput.value = '';
    // Append li to the ul
    taskList.appendChild(li);


    e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log(e.target);
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
            //remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from ls
function removeTaskFromLocalStorage(taskItem){
    // console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(){
    //first option
    // taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
        //Clear tasks from LS
        clearTasksFromLocalStorage();
    }
    //  clear from Local Storage
    function clearTasksFromLocalStorage(){
        localStorage.clear();
    }
}

//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!= -1){
                task.style.display = 'block'
            } else {
                task.style.display = 'none'
            }
        }
    )
}