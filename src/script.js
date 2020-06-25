import { projectList, ProjectItem, TaskItem } from './project-and-task.js'
import { renderProject, renderTask, renderProjectList } from './render.js'
import { loadData } from './local-storage.js';

// content holder elements
let htmlProjectList = document.querySelector('.project-list');
let htmlTaskList = document.querySelector('.task-list');
//-----------------------------------------------------------------------

// buttons
let createProject = document.querySelector('.create-project');
let createTask = document.querySelector('.create-task');
let cancelProject = document.querySelector('.cancel-project');
let cancelTask = document.querySelector('.cancel-task');
//-----------------------------------------------------------------------

// forms
let projectForm = document.querySelector('.project-form');
let taskForm = document.querySelector('.task-form');
//-----------------------------------------------------------------------

// open/close mechanisms for the forms
function openForm(button,form) {
    button.style.setProperty('display','none');
    form.style.setProperty('display','flex');
}

function closeForm(button,form) {
    button.style.setProperty('display','flex');
    form.style.setProperty('display','none');
}

createProject.addEventListener('click', () => {
    openForm(createProject,projectForm);
});

createTask.addEventListener('click', () => {
    if (activeProject == null || activeProject == undefined) {
        alert('There is no active project. Please select a project from the project list or create a new one in order to create tasks.')
    } else {
        openForm(createTask,taskForm);
    }
});

cancelProject.addEventListener('click', () => {
    closeForm(createProject,projectForm);
});

cancelTask.addEventListener('click', () => {
    closeForm(createTask,taskForm);
});
//-----------------------------------------------------------------------

// form submit and project/task item creation
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // implement element creation here
    let title = document.querySelector('#project-title').value;
    let deadline = document.querySelector('#project-deadline').value;

    let newProject = new ProjectItem(title,deadline);
    renderProject(newProject,htmlProjectList);
    htmlTaskList.innerHTML = '';

    closeForm(createProject,projectForm);
    projectForm.reset();
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.querySelector('#task-title').value;
    let deadline = document.querySelector('#task-deadline').value;

    let newTask = new TaskItem(title,deadline,activeProject);
    renderTask(newTask,htmlTaskList,activeProject);

    closeForm(createTask,taskForm);
    taskForm.reset();
});

function defineActiveProject(project) {
    activeProject = project;
}

function projectDeletion(project) {
    if (activeProject == project) {
        activeProject = null;
    }
}

let activeProject;
if (loadData() == true) {
    renderProjectList(projectList.list);
    let projects = document.querySelectorAll('.project-item');
    for (let i = 0; i < projects.length; i++) {
        projects[i].style.setProperty('border','none');
    }
    activeProject = null;
}

export { activeProject, defineActiveProject, projectDeletion, htmlProjectList, htmlTaskList }