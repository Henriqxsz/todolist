
let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");


function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.value}
                        <div class="task-actions">
                            <button class="complete"><i class="fas fa-check"></i></button>
                            <button class="delete"><i class="fas fa-trash"></i></button>
                        </div>`;
        if (task.completed) {
            li.classList.add("completed");
        }
        taskList.appendChild(li);
    });
}


function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            value: li.firstChild.textContent.trim(),
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", function() {
    let taskValue = taskInput.value.trim();
    
    if (taskValue) {
        let li = document.createElement("li");
        li.innerHTML = `${taskValue}
        
                        <div class="task-actions">
                            <button class="complete"><i class="fas fa-check"></i></button>
                            <button class="delete"><i class="fas fa-trash"></i></button>
                        </div>`;
        
        taskList.appendChild(li);
        taskInput.value = "";
        saveTasks();
        
    }
});

taskList.addEventListener("click", function(event) {
    if (event.target.closest("button").classList.contains("delete")) {
        let li = event.target.closest("li");
        taskList.removeChild(li);
        saveTasks();
        
    } else if (event.target.closest("button").classList.contains("complete")) {
        let li = event.target.closest("li");
        li.classList.toggle("completed");
        saveTasks();
        
    }
    
});

loadTasks();
