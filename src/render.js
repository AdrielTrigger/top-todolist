import { activeProject, defineActiveProject, activeProjectDeletion, htmlProjectList, htmlTaskList, parseDate } from './script.js'
import { projectList } from './project-and-task.js'
import { getData } from './local-storage.js';
import isToday from 'date-fns/isToday';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';
import isBefore from 'date-fns/isBefore';

function renderItem (ptItem,listHolder) { // pt stands for project/task
    // creation of html elements
    let wrapper = document.createElement('div');
    let item = document.createElement('div');
    let data = document.createElement('div');
    let htmlTitle = document.createElement('span');
    let htmlDeadline = document.createElement('span');
    let itemButtons = document.createElement('div');
    let editButton = document.createElement('div');
    let deleteButton = document.createElement('div');

    htmlTitle.innerHTML = `TITLE: ${ptItem.title}`;
    htmlDeadline.innerHTML = `DEADLINE: ${ptItem.deadline}`;
    editButton.innerHTML = 'EDIT';
    deleteButton.innerHTML = 'DELETE';

    // appending of created elements
    data.appendChild(htmlTitle);
    data.appendChild(htmlDeadline);
    item.appendChild(data);
    
    itemButtons.appendChild(editButton);
    itemButtons.appendChild(deleteButton);
    item.appendChild(itemButtons);

    wrapper.appendChild(item);
    listHolder.appendChild(wrapper);

    // class assignments
    wrapper.classList.add('item-wrapper');
    if (ptItem.type == 'project') {
        item.classList.add('project-item');
        data.classList.add('project-data');
        itemButtons.classList.add('project-item-buttons');
    } else if (ptItem.type == 'task') {
        item.classList.add('task-item');
        data.classList.add('task-data');
        itemButtons.classList.add('task-item-buttons');
    }

    // color scheme auto-selection
    if (ptItem.type == 'project') {
        wrapper.style.setProperty('background-color','white');
        wrapper.style.setProperty('color','rgb(34, 139, 158)');
    } else if (ptItem.type = 'task') {
        wrapper.style.setProperty('background-color','rgb(34, 139, 158)');
        wrapper.style.setProperty('color','white');
    }

    // implementation of features
    let removal = false;

    // project item selection
    wrapper.addEventListener('click', () => {
        if (removal == false && ptItem.type == 'project') {
            makeActive(ptItem,wrapper);
            htmlTaskList.innerHTML = '';
            renderTaskList(ptItem);
        }
    });

    // item editting
    editButton.addEventListener('click', () => {
        // prevention against overexposition of features
        item.style.setProperty('display','none');

        // creation of html menu elements
        let editMenu = document.createElement('div');
        let editArea = document.createElement('div');
        let titleLabel = document.createElement('label');
        let deadlineLabel = document.createElement('label');
        let newTitle = document.createElement('input');
        let newDeadline = document.createElement('input');
        let editButtons = document.createElement('div');
        let submit = document.createElement('div');
        let cancel = document.createElement('div');

        titleLabel.innerHTML = 'NEW TITLE:';
        deadlineLabel.innerHTML = 'NEW DEADLINE:';
        newTitle.value = ptItem.title;
        newDeadline.value = ptItem.deadline;
        submit.innerHTML = 'SUBMIT';
        cancel.innerHTML = 'CANCEL';

        // appending of elements
        editArea.appendChild(titleLabel);
        editArea.appendChild(newTitle);
        editArea.appendChild(deadlineLabel);
        editArea.appendChild(newDeadline);

        editButtons.appendChild(submit);
        editButtons.appendChild(cancel);

        editMenu.appendChild(editArea);
        editMenu.appendChild(editButtons);

        wrapper.appendChild(editMenu);

        // class assignments
        editMenu.classList.add('edit-menu');
        editArea.classList.add('edit-area');
        editButtons.classList.add('edit-buttons');
        newDeadline.setAttribute('type','date');

        // color scheme auto-selection
        if (ptItem.type == 'project') {
            editMenu.style.setProperty('background-color','rgb(34, 139, 158)');
            editMenu.style.setProperty('color','white');
            submit.style.setProperty('background-color','white');
            submit.style.setProperty('color','rgb(34, 139, 158)');
            cancel.style.setProperty('background-color','white');
            cancel.style.setProperty('color','rgb(34, 139, 158)');
        } else if (ptItem.type = 'task') {
            editMenu.style.setProperty('background-color','white');
            editMenu.style.setProperty('color','rgb(34, 139, 158)');
            submit.style.setProperty('background-color','rgb(34, 139, 158)');
            submit.style.setProperty('color','white');
            cancel.style.setProperty('background-color','rgb(34, 139, 158)');
            cancel.style.setProperty('color','white');
        }

        // edit buttons functions

        // submit button
        submit.addEventListener('click', () => {
            ptItem.title = newTitle.value;
            ptItem.deadline = newDeadline.value;

            let date = parseDate(newDeadline.value);

            if (ptItem.type == 'task') {
                let projectDate = parseDate(activeProject.deadline);
                if (isToday(date) || isAfter(date, new Date) && isSameDay(date,projectDate) || isBefore(date,projectDate)) {
                    htmlTitle.innerHTML = `TITLE: ${newTitle.value}`;
                    htmlDeadline.innerHTML = `DEADLINE ${newDeadline.value}`;
                    item.style.setProperty('display','flex');
                    wrapper.removeChild(editMenu);
                    getData(projectList.list);
                } else {
                    alert('Please select a valid date. It must respect the project deadline.');
                }
            } else if (isToday(date) || isAfter(date, new Date && ptItem.type == 'project')) {
                htmlTitle.innerHTML = `TITLE: ${newTitle.value}`;
                htmlDeadline.innerHTML = `DEADLINE ${newDeadline.value}`;
                item.style.setProperty('display','flex');
                wrapper.removeChild(editMenu);
                getData(projectList.list);
            } else {
                alert('Please select a valid date. It must be today or later.');
            }
        });

        // cancel button
        cancel.addEventListener('click', () => {
            item.style.setProperty('display','flex');
            wrapper.removeChild(editMenu);
        });
    });

    // item deletion
    deleteButton.addEventListener('click', () => {
        removal = true;
        if (ptItem.type == 'project') {
            projectList.list.splice(ptItem.position,1);
            if (activeProject == ptItem) {
                htmlTaskList.innerHTML = '';
                activeProjectDeletion(project);
            }
        } else if (ptItem.type == 'task') {
            activeProject.taskList.splice(ptItem.position,1);
        }
        listHolder.removeChild(wrapper);
        getData(projectList.list)
    });

    getData(projectList.list);
}

function renderProjectList (list) {
    for (let i = 0; i < list.length; i++) {
        renderItem(list[i],htmlProjectList);
    }
}

function renderTaskList (project) {
    for (let i = 0; i < project.taskList.length; i++) {
        renderItem(project.taskList[i],htmlTaskList);
    }
}

function makeActive (project,wrapper) {
    defineActiveProject(project);
    let projects = htmlProjectList.querySelectorAll('.item-wrapper');
    
    for (let i = 0; i < projects.length; i++) {
        projects[i].style.setProperty('border','none');
    }

    wrapper.style.setProperty('border','3px solid blue');
}

export { renderItem, renderProjectList, renderTaskList }