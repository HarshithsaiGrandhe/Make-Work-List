document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
    const saveTasks = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));
    const loadTasks = () => getTasks().forEach(addTaskToList);

    const addTaskToList = (task) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.classList.toggle("completed", task.completed);

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks(getTasks().map(t => t.text === task.text ? task : t));
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(li);
            saveTasks(getTasks().filter(t => t.text !== task.text));
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const task = { text: taskText, completed: false };
        addTaskToList(task);
        saveTasks([...getTasks(), task]);
        taskInput.value = "";
    });

    loadTasks();
});