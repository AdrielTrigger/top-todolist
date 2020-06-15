import { projects, tasks, activeProject } from './script.js'
import { projectList } from './project-and-task.js';

function renderProjectItem(project) {
    let htmlTitle = document.createElement('span');
    let htmlDeadline = document.createElement('span');
    let htmlProject = document.createElement('div');

    htmlTitle.innerHTML = project.title;
    htmlDeadline.innerHTML = project.deadline;

    htmlProject.appendChild(htmlTitle);
    htmlProject.appendChild(htmlDeadline);
    htmlProject.classList.add('project-item');

    return htmlProject;
}

function renderTaskItem(task) {
    let htmlName = document.createElement('span');
    let htmlDeadline = document.createElement('span');
    let htmlTask = document.createElement('div');

    htmlName.innerHTML = task.name;
    htmlDeadline.innerHTML = task.deadline;
    htmlTask.appendChild(htmlName);
    htmlTask.appendChild(htmlDeadline);
    htmlTask.classList.add('task-item');

    let cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel Task';
    cancelButton.addEventListener('click', () => {
        activeProject.taskList.splice(task.position,1);
        tasks.removeChild(htmlTask);
    });
    htmlTask.appendChild(cancelButton);

    return htmlTask;
}

function renderProjectList(projectList,listHolder) {
    let i = 0;
    let list = projectList.list;
    
    while (i < list.length) {
        let listItem = renderProjectItem(list[i]);
        listHolder.appendChild(listItem);
        i++;
    }
}

function renderTaskList(project,listHolder) {
    let i = 0;
    let list = project.taskList;

    while (i < list.length) {
        let listItem = renderTaskItem(list[i]);
        listHolder.appendChild(listItem);
        i++;
    }
}

export { renderProjectItem, renderTaskItem, renderProjectList, renderTaskList }