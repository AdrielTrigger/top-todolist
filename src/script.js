import { projectList, ProjectItem, TaskItem } from './project-and-task.js'
import { renderItem, renderProjectList } from './render.js'
import { loadData } from './local-storage.js';
import isToday from 'date-fns/isToday';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';
import isBefore from 'date-fns/isBefore';

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

    let date = parseDate(deadline);

    if (isToday(date) || isAfter(date, new Date)) {
        let newProject = new ProjectItem(title,deadline);
        renderItem(newProject,htmlProjectList);
        htmlTaskList.innerHTML = '';

        closeForm(createProject,projectForm);
        projectForm.reset();
    } else {
        alert('Please select a valid date. It must be today or later.');
    }
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.querySelector('#task-title').value;
    let deadline = document.querySelector('#task-deadline').value;

    let date = parseDate(deadline);
    let projectDate = parseDate(activeProject.deadline);

    if ((isToday(date) || isAfter(date, new Date)) && (isSameDay(date,projectDate) || isBefore(date,projectDate))) {
        let newTask = new TaskItem(title,deadline,activeProject);
        renderItem(newTask,htmlTaskList);
    
        closeForm(createTask,taskForm);
        taskForm.reset();
    } else {
        alert('Please select a valid date. It must respect the project deadline.');
    }
});

function defineActiveProject(project) {
    activeProject = project;
}

function activeProjectDeletion(project) {
    if (activeProject == project) {
        activeProject = null;
    }
}

function parseDate (stringDate) {
    let year, month, day;
    let stringYear = '';
    let stringMonth = '';
    let stringDay = '';
    for (let i = 0; i < stringDate.length; i++) {
        if (i < 4) {
            stringYear += stringDate[i];
        } else if (i > 4 && i < 7) {
            stringMonth += stringDate[i];
        } else if (i > 7) {
            stringDay += stringDate[i];
        }
    }
    year = parseInt(stringYear);
    month = parseInt(stringMonth);
    day = parseInt(stringDay);
    let date = new Date(year,month - 1,day);
    return date;
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

export { activeProject, defineActiveProject, activeProjectDeletion, htmlProjectList, htmlTaskList, parseDate }