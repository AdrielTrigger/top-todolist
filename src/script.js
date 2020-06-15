import { projectList, ProjectItem, TaskItem } from './project-and-task.js';
import { renderProjectItem, renderTaskItem, renderTaskList } from './render.js'
import { localStorage } from './local-storage.js'

// html content holders
let projects = document.querySelector('.projects');
let projectForm = document.querySelector('.project-form');
let tasks = document.querySelector('.tasks');
let taskSpace = document.querySelector('.task-space');
let taskForm = document.querySelector('.task-form');

// buttons
let createProject = document.querySelector('.add-project');
let createTask = document.querySelector('.add-task');
let cancelProject = document.querySelector('.cancel-project');
let cancelTask = document.querySelector('.cancel-task');

// forms access
createProject.addEventListener('click', () => {
    projectForm.style.setProperty('display', 'flex');
});

cancelProject.addEventListener('click', () => {
    projectForm.style.setProperty('display', 'none');
});

createTask.addEventListener('click', () => {
    taskForm.style.setProperty('display', 'flex');
});

cancelTask.addEventListener('click', () => {
    taskForm.style.setProperty('display', 'none');
});

let todayProject = new ProjectItem('today', 'not yesterday or tomorrow');
let activeProject = todayProject;
let htmlToday = renderProjectItem(todayProject);
htmlToday.addEventListener('click', () => {
    activeProject = todayProject;
    tasks.innerHTML = '';
    renderTaskList(todayProject,tasks);
});
projects.appendChild(htmlToday);

// input capture and direction
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let title = document.querySelector('.title').value;
    let deadline = document.querySelector('.deadline').value;

    let newProject = new ProjectItem(title,deadline);
    activeProject = newProject;

    let htmlProject = renderProjectItem(newProject);
    htmlProject.style.setProperty('border', '4px solid white');

    let cancelProject = document.createElement('button');
    cancelProject.innerHTML = 'Cancel Project';
    cancelProject.addEventListener('click', () => {
        if (activeProject == newProject) {
            tasks.innerHTML = '';
        }
        projectList.list.splice(newProject.position,1);
        projects.removeChild(htmlProject);
    });
    htmlProject.appendChild(cancelProject);

    projects.appendChild(htmlProject);

    htmlProject.addEventListener('click', () => {
        activeProject = newProject;
        tasks.innerHTML = '';
        renderTaskList(newProject,tasks);
    });

    projectForm.reset();
    projectForm.style.setProperty('display', 'none');
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.querySelector('.task-name').value;
    let taskDeadline = document.querySelector('.task-deadline').value;

    let newTask = new TaskItem(name,taskDeadline,activeProject);

    let htmlTask = renderTaskItem(newTask);
    tasks.appendChild(htmlTask);

    taskForm.reset();
    taskForm.style.setProperty('display', 'none');
});

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

projects.addEventListener('click', (e) => {
    let target = getEventTarget(e);
    if (target.className == 'project-item') {
        let projectListing = document.querySelectorAll('.project-item');
        let i = 0;
        while (i < projectListing.length) {
            projectListing[i].style.setProperty('border', '4px solid gold');
            i++;
        }
        target.style.setProperty('border', '4px solid white');
    }
});

function clearTasks() {
    tasks.innerHTML = '';
}

export { projects, tasks, activeProject }