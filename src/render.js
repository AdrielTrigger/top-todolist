import { activeProject, defineActiveProject, projectDeletion, htmlProjectList, htmlTaskList } from './script.js'
import { projectList } from './project-and-task.js'
import { getData } from './local-storage.js';

function renderProject (project,listHolder) {
    let title = project.title;
    let deadline = project.deadline;
    let removal = false;

    let htmlTitle = document.createElement('span');
    let htmlDeadline = document.createElement('span');
    let htmlProjectData = document.createElement('div');
    let buttons = document.createElement('div');
    let editButton = document.createElement('div');
    let deleteButton = document.createElement('div');
    let htmlProject = document.createElement('div');

    htmlTitle.innerHTML = `TITLE: ${title}`;
    htmlDeadline.innerHTML = `DEADLINE: ${deadline}`;
    editButton.innerHTML = 'EDIT';
    deleteButton.innerHTML = 'DELETE';

    htmlProjectData.appendChild(htmlTitle);
    htmlProjectData.appendChild(htmlDeadline);
    htmlProjectData.classList.add('project-data');
    
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    buttons.classList.add('project-item-buttons');

    htmlProject.appendChild(htmlProjectData);
    htmlProject.appendChild(buttons);
    htmlProject.classList.add('project-item');
    listHolder.appendChild(htmlProject);

    htmlProject.addEventListener('click', () => {
        if (removal != true) {
            makeActive(project,htmlProject);
            htmlTaskList.innerHTML = '';
            renderTaskList(project);
        }
    });

    deleteButton.addEventListener('click', () => {
        removal = true;
        listHolder.removeChild(htmlProject);
        projectList.list.splice(project.position,1);
        htmlTaskList.innerHTML = '';
        projectDeletion(project);
        getData(projectList.list);
    });

    makeActive(project,htmlProject);
    getData(projectList.list);
}

function renderTask (task,listHolder) {
    let title = task.title;
    let deadline = task.deadline;

    let htmlTitle = document.createElement('span');
    let htmlDeadline = document.createElement('span');
    let htmlTaskData = document.createElement('div');
    let buttons = document.createElement('div');
    let editButton = document.createElement('div');
    let deleteButton = document.createElement('div');
    let htmlTask = document.createElement('div');

    htmlTitle.innerHTML = `TITLE: ${title}`;
    htmlDeadline.innerHTML = `DEADLINE: ${deadline}`;
    editButton.innerHTML = 'EDIT';
    deleteButton.innerHTML = 'DELETE';

    htmlTaskData.appendChild(htmlTitle);
    htmlTaskData.appendChild(htmlDeadline);
    htmlTaskData.classList.add('task-data');

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    buttons.classList.add('task-item-buttons');

    htmlTask.appendChild(htmlTaskData);
    htmlTask.appendChild(buttons);
    htmlTask.classList.add('task-item');
    listHolder.appendChild(htmlTask);

    deleteButton.addEventListener('click', () => {
        activeProject.taskList.splice(task.position,1);
        listHolder.removeChild(htmlTask);
        getData(projectList.list);
    });

    getData(projectList.list);
}

function renderProjectList (list) {
    for (let i = 0; i < list.length; i++) {
        renderProject(list[i],htmlProjectList);
    }
}

function renderTaskList (project) {
    for (let i = 0; i < project.taskList.length; i++) {
        renderTask(project.taskList[i],htmlTaskList);
    }
}

function makeActive (project,htmlProject) {
    defineActiveProject(project);
    let projects = document.querySelectorAll('.project-item');
    
    for (let i = 0; i < projects.length; i++) {
        projects[i].style.setProperty('border','none');
    }

    htmlProject.style.setProperty('border','3px solid blue');
}

export { renderProject, renderTask, renderProjectList, renderTaskList }