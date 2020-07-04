import { projectList, ProjectItem, TaskItem } from './project-and-task.js'
import { renderProjectList } from './render.js'

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function getData(list) {
    localStorage.clear();
    let projects = []; let tasks = [];
    for (let i = 0; i < list.length; i++) {
        //this creates an array with project #i's title and deadline data
        let savedProject = [list[i].title,list[i].deadline];
        projects.push(savedProject);
        if (list[i].taskList.length > 0) {
            let taskList = list[i].taskList;
            let savedTaskList = [];
            for (let j = 0; j < taskList.length; j++) {
                let savedTask = [taskList[j].title,taskList[j].deadline];
                savedTaskList.push(savedTask);
            }
            tasks.push(savedTaskList);
        } else {
            tasks.push([]);
        }
    }
    localStorage.setItem('projects',JSON.stringify(projects));
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function loadData () {
    if (localStorage.getItem('projects')) {
        let projects = JSON.parse(localStorage.getItem('projects'));
        let tasks = JSON.parse(localStorage.getItem('tasks'));

        for (let i = 0; i < projects.length; i++) {
            //this reclaims project #i's title and deadline by referring to the position in which they were saved
            let project = new ProjectItem(projects[i][0],projects[i][1]);
            if (tasks[i].length > 0) {
                for (let j = 0; j < tasks[i].length; j++) {
                    let task = new TaskItem(tasks[i][j][0],tasks[i][j][1],project);
                }
            }
        }
        return true;
    }
}

export { storageAvailable, getData, loadData }