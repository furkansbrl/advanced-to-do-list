document.addEventListener("DOMContentLoaded", function(event){

    //* remove function added
    Array.prototype.remove = function(){
        var what, a = arguments, L = a.length, ax;
        while(L && this.length){
            what = a[--L];
            while((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };
    
    
    //! DOMs
     let btnAddTaskList = document.querySelector("#btnAddTaskList"); //* add task list button DOM
        
     let btnSelectAll = document.querySelector("#btnSelectAll"); //* select all DOM
    
     let btnRemoveTask = document.querySelector("#btnRemoveTask");   //* remove from list DOM
    
     let newTaskName = document.querySelector("#newTaskName");   //* added task input DOM
     
     let taskListUl = document.querySelector("#taskListUl");    //* selected tasks DOM
    
     let completedListUl = document.querySelector("#completedListUl");  //* completed tasks DOM

     let btnClearList = document.querySelector("#clearList");       //* deleted tasks DOM


    //! Arrays
        let taskList = [];
        let selectedTaskList = [];
        let completedTaskList = [];
    
        
    //! Events
        btnAddTaskList.addEventListener("click", function(event) {  //* Add Task List button click event
            event.preventDefault();
            createElement();
        });
    
        newTaskName.addEventListener("keypress", function(event) {  //* Add task button Enter event
            if (event.key == "Enter") {
                createElement();
            }
        });
    
        btnSelectAll.addEventListener("click", function(event){    //* Select all button click event
            event.preventDefault();
            if(taskList.length > selectedTaskList.length){
                taskList.forEach(function (value, index, array) {
                    // console.log(value);
                    let selectInput = document.querySelector("#input-" + value);    // selectedTask inputu
    
                    let check = selectedTaskList.indexOf(value);
                    if (check === -1) {
                        selectedTaskList.push(value);
                        selectInput.checked = true;
                    }
                });
            
            } else{
                taskList.forEach(function (value, index, array) {
                    let selectInput = document.querySelector("#input-" + value);
                    if(selectInput.checked){
                        selectInput.checked = false;
                        selectedTaskList.remove(value);
                    }
                });
            }
        });
    
        btnRemoveTask.addEventListener("click", function(event){    //* Remove from list button click event
            event.preventDefault();
            
            if (!selectedTaskList.length) {
                alert("Seçili bir Görev Yok!")
            } 
            else {
                selectedTaskList.forEach(function(value, index, array){
                    let wrapperLi = document.querySelector("#wrapper-" + value);
                    wrapperLi.remove();
                    taskList.remove(value);
                });
                selectedTaskList = [];  //* selectTask içini sıfırladık
            }
            // console.log(selectedTaskList);
            // console.log(taskList);
        });
        
        btnCompletedTask.addEventListener("click", function(event) {  //* Completed button click event
            
            if (!selectedTaskList.length) {     /* also -->  selectedTaskList.length < 1 */
                
            alert("Seçili Görev Yok!");
            }
            else {

                completedTaskList = selectedTaskList.concat(completedTaskList);

                completedTaskList.forEach(element => {
                    
                    let label = document.querySelector('label[for="input-' + element + '"]');

                    createCompletedElement(label.innerText);

                    let deleteLi = document.querySelector("#wrapper-" + element);
                    deleteLi.remove();

                    selectedTaskList.remove(element);
                    taskList.remove(element);

                });
                
            }
        
        });
    
        btnClearList.addEventListener("click", function(event){       //* Delete all button click event
            let liList = document.querySelectorAll(".completed-li");
            
            liList.forEach(function(value, key, parent){
                value.remove();
            });

            completedTaskList = [];

        });


    //! Functions
        function createElement(){
            if (newTaskName.value.trim() == "" || newTaskName.value.trim() == null) {
                alert("Görev alanı boş bırakılamaz!");
            } 
            else{
                let inputID = taskList.length + 1;
            taskList.push(inputID);
            
            let li = document.createElement("li");
            li.className = "list-group-item task-list-item";
            li.id = "wrapper-" + inputID;
    
            let input = document.createElement("input");
            input.className = "select-task me-1";
            input.type = "checkbox";
            input.id = "input-" + inputID;
    
            
            input.onchange = function() {
                onchangeAction(inputID);
            }
    
    
            let label = document.createElement("label");
            label.innerText = newTaskName.value;
            label.setAttribute("for", "input-" + inputID);
            
            let iElement = document.createElement("i");
            iElement.className = "fa fa-trash-o float-end me-2 trashed";
            iElement.id = "icon-" + inputID;
            iElement.onclick = function(){
                iElementClick(inputID);
            }
    
            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(iElement);
    
            taskListUl.appendChild(li);
            }
        }
    
    
        function onchangeAction(inputID){
            let control = selectedTaskList.indexOf(inputID);
    
            if(control === -1){
                selectedTaskList.push(inputID);
            
            }else{
                selectedTaskList.remove(inputID);
            }
            
        }
    
    
        function iElementClick(inputID){
            let questionAnwer = confirm("Silmek istediğinize emin misiniz ?");
    
            if(questionAnwer){
                let wrapperLi = document.querySelector("#wrapper-" + inputID);
                wrapperLi.remove();     //* HTML den sil
                taskList.remove(inputID);   //* taskList arrayden sil
                selectedTaskList.remove(inputID);   //* selectedTaskList arrayden sil
                alert("Silindi !");
            }
            else{
                alert("Silinmedi !");
            }
    
        }

        function createCompletedElement(lblText){
            let completetLi = document.createElement("li");
            completetLi.className = "list-group-item task-list-item px-3 completed-li";

            let completedLabel = document.createElement("label");
            completedLabel.innerText = lblText;

            completetLi.appendChild(completedLabel);
            completedListUl.appendChild(completetLi);
        }
    });