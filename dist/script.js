// interface selectors
projectList = document.querySelector('.projects');
taskList = document.querySelector('.tasks');
projectForm = document.querySelector('.project-form');

// button selectors
addProject = document.querySelector('.add-project');
projectCancel = document.querySelector('.cancel-project');

// project form mechanisms
addProject.addEventListener('click', () => {
   projectForm.style.setProperty('display', 'flex'); 
});

projectCancel.addEventListener('click', () => {
    projectForm.reset();
    projectForm.style.setProperty('display', 'none');
});

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let titleContent = document.querySelector('.title').value;
    let deadlineContent = document.querySelector('.deadline').value;

    let title = document.createElement('span');
    let deadline = document.createElement('span');
    title.innerHTML = titleContent;
    deadline.innerHTML = deadlineContent;

    let project = document.createElement('div');
    project.classList.add('project-item');
    project.appendChild(title);
    project.appendChild(deadline);

    projectList.appendChild(project);
    projectForm.reset();
    projectForm.style.setProperty('display', 'none');
});