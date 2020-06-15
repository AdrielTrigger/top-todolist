import { renderTaskList } from './render.js'
import { tasks } from './script.js'

// creates a logical list of project objects
const projectList = (() => {

    let list = [];

    const addProject = (project) => {
        list.push(project);
    };

    return { list, addProject };

})();

// rules and mechanisms of project objects
class ProjectItem {

    constructor(title,deadline) {
        this.title = title;
        this.deadline = deadline;
        this.position = projectList.list.length;
        this.taskList = [];
        projectList.addProject(this);

        tasks.innerHTML = '';
        renderTaskList(this,tasks);
    }

    addTask(task) {
        this.taskList.push(task);
    }
    
}

class TaskItem {
    
    constructor(name,deadline,project) {
        this.name = name;
        this.deadline = deadline;
        this.position = project.taskList.length;
        project.addTask(this);
    }

}

export { projectList, ProjectItem, TaskItem }