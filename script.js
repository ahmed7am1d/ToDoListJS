//1- Saving our elements
let taskInputField = document.querySelector(".input");
let buttonAddTask = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//--on load of the window load the tasks from the local storage

const loadTasks = function () {
  if (localStorage.getItem("tasks") != null) {
    let myTasks = localStorage
      .getItem("tasks")
      .substring(1, localStorage.getItem("tasks").length - 1)
      .split(",");

    //we got each word clear without any marks
    if (myTasks[0] !== "") {
      myTasks.forEach((task) => {
        //-- we create div with class (taskContent)
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("taskContent", "new-box");
        //-- we create h3 element and append text to it
        let taskTitleElement = document.createElement("h3");
        let taskTitleTextNode = document.createTextNode(
          task.substring(1, task.length - 1)
        );
        taskTitleElement.appendChild(taskTitleTextNode);
        //-- we create input of type submit with value delete
        let deleteTaskElement = document.createElement("input");
        deleteTaskElement.type = "submit";
        deleteTaskElement.value = "Delete";

        //--add event listerner to the button

        deleteTaskElement.addEventListener(
          "click",
          (e) => {
            //remove from local storage
            let taskToRemoveMiddle = `"${task.substring(1, task.length - 1)}",`;
            let taskToRemoveStartOrMiddle = `"${task.substring(
              1,
              task.length - 1
            )}"`;
            let tasksLocal = localStorage.getItem("tasks");

            if (tasksLocal.includes(taskToRemoveMiddle)) {
              tasksLocal = tasksLocal.replace(taskToRemoveMiddle, "");
              localStorage.setItem("tasks", tasksLocal);
              e.target.parentNode.parentNode.remove();
            } else {
              tasksLocal = tasksLocal.replace(taskToRemoveStartOrMiddle, "");
              localStorage.setItem("tasks", tasksLocal);
              e.target.parentNode.remove();
            }
          },
          false
        );

        //-- creating another input of type submit but with value done
      let doneTaskElement = document.createElement("input");
      doneTaskElement.type = "submit";
      doneTaskElement.value = "Done";
      doneTaskElement.addEventListener("click",(e)=> {
          //-- we just need to make crossse line with color orange on the whole parent div of the clicked button
          let parentTaskDiv = e.target.parentNode;
          let parentParent = parentTaskDiv.parentNode;
          parentParent.classList.add('done');
      },false);
    
      //append two button to a div with class called buttons
      let buttonsDiv = document.createElement('div');
      buttonsDiv.className ='buttons';
      buttonsDiv.appendChild(doneTaskElement);
      buttonsDiv.appendChild(deleteTaskElement);

    //-- we append the title of task and the delete input field to the taskcontent
    taskDiv.appendChild(taskTitleElement);
    taskDiv.appendChild(buttonsDiv);



    //-- we append the div task content to the (tasks) div
    tasksDiv.appendChild(taskDiv);

      });
    }
  }
};
window.onload = loadTasks;

//2- adding event listerner to the add button
buttonAddTask.onclick = () => {
  //-- we get the value from the input field
  let inputFieldValue = taskInputField.value.toString();
  if (!/\S/.test(inputFieldValue) || inputFieldValue == null) {
    alert("Task Title Is Missing !!!");
  } else {
    //--save task in local storage
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("tasks") || "[]"),
        inputFieldValue,
      ])
    );


    //-- we create div with class (taskContent)
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("taskContent", "new-box");


    //-- we create h3 element and append text to it
    let taskTitleElement = document.createElement("h3");
    let taskTitleTextNode = document.createTextNode(inputFieldValue);
    taskTitleElement.appendChild(taskTitleTextNode);


    //-- we create input of type submit with value delete
    let deleteTaskElement = document.createElement("input");
    deleteTaskElement.type = "submit";
    deleteTaskElement.value = "Delete";

    

    //--add event listerner to the button

    deleteTaskElement.addEventListener(
      "click",
      (e) => {
        //remove from local storage
        let taskToRemoveMiddle = `"${inputFieldValue}",`;
        let taskToRemoveStartOrMiddle = `"${inputFieldValue}"`;
        let tasksLocal = localStorage.getItem("tasks");

        if (tasksLocal.includes(taskToRemoveMiddle)) {
          tasksLocal = tasksLocal.replace(taskToRemoveMiddle, "");
          localStorage.setItem("tasks", tasksLocal);
          e.target.parentNode.remove();
        } else {
          tasksLocal = tasksLocal.replace(taskToRemoveStartOrMiddle, "");
          localStorage.setItem("tasks", tasksLocal);
          e.target.parentNode.parentNode.remove();
        }
      },
      false
    );

    //-- creating another input of type submit but with value done
      let doneTaskElement = document.createElement("input");
      doneTaskElement.type = "submit";
      doneTaskElement.value = "Done";
      doneTaskElement.addEventListener("click",(e)=> {
          //-- we just need to make crossse line with color orange on the whole parent div of the clicked button
          let parentTaskDiv = e.target.parentNode;
          let parentParent = parentTaskDiv.parentNode;
          parentParent.classList.add('done');
      },false);
    
      //append two button to a div with class called buttons
      let buttonsDiv = document.createElement('div');
      buttonsDiv.className ='buttons';
      buttonsDiv.appendChild(doneTaskElement);
      buttonsDiv.appendChild(deleteTaskElement);

    //-- we append the title of task and the delete input field to the taskcontent
    taskDiv.appendChild(taskTitleElement);
    taskDiv.appendChild(buttonsDiv);



    //-- we append the div task content to the (tasks) div
    tasksDiv.appendChild(taskDiv);

    //--reset the input field
    taskInputField.value = "";
  }
};

//3- adding event listerner for the seeded data, (fake generated data at the begining)
// let listOfDeleteButton = document.querySelectorAll('.deleteTask');
// listOfDeleteButton.forEach((deleteButton) => {

//     deleteButton.addEventListener('click',(e)=>{
//         e.target.parentNode.remove();
//     },false)

// })
