"use strict";
// Chargement des tâches sauvegardées lors du chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

$("#taskList").sortable();

function saveTasks() {
    var taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem("taskList", taskList);
}

function loadTasks() {
    var taskList = localStorage.getItem("taskList");
    if (taskList) {
        document.getElementById("taskList").innerHTML = taskList;
    }
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    var taskDate = document.getElementById("taskDate").value;
    var taskTime = document.getElementById("taskTime").value;

    if (taskText !== "") {
        var taskList = document.getElementById("taskList");
        var li = document.createElement("li");
        li.className = "draggable";
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="task-date">${taskDate}</span>
            <span class="task-time">${taskTime}</span>
            <button class="edit-button" onclick="editTask(this)">Modifier</button>
            <button class="remove-button" onclick="removeTask(this)">Supprimer</button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
        document.getElementById("taskDate").value = "";
        document.getElementById("taskTime").value = "";

        // Après avoir ajouté une tâche, sauvegardez la liste mise à jour
        saveTasks();
    }
}

function removeTask(button) {
    var taskList = document.getElementById("taskList");
    taskList.removeChild(button.parentElement);

    // Après avoir supprimé une tâche, sauvegardez la liste mise à jour
    saveTasks();
}

function editTask(button) {
    var taskTextElement = button.parentElement.querySelector(".task-text");
    var taskDateElement = button.parentElement.querySelector(".task-date");
    var taskTimeElement = button.parentElement.querySelector(".task-time");
    var taskText = taskTextElement.textContent;
    var taskDate = taskDateElement.textContent;
    var taskTime = taskTimeElement.textContent;

    var newText = prompt("Modifier la tâche :", taskText);
    var newDate = prompt("Modifier la date :", taskDate);
    var newTime = prompt("Modifier l'heure :", taskTime);

    if (newText !== null && newDate !== null && newTime !== null) {
        taskTextElement.textContent = newText;
        taskDateElement.textContent = newDate;
        taskTimeElement.textContent = newTime;

        // Après avoir modifié une tâche, sauvegardez la liste mise à jour
        saveTasks();
    }
}
