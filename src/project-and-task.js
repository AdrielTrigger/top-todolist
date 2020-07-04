const projectList = (() => {
    let list = [];
    return { list }
})();

class ProjectItem {
    constructor(title,deadline) {
        this.title = title;
        this.deadline = deadline;
        this.position = projectList.list.length;
        this.taskList = [];
        this.type = 'project';
        projectList.list.push(this);
    }
    
    addTask(task) {
        task.position = this.taskList.length;
        this.taskList.push(task);
    }
}

class TaskItem {
    constructor(title,deadline,project) {
        this.title = title;
        this.deadline = deadline;
        this.position;
        this.type = 'task';
        project.addTask(this);
    }
}

export { projectList, ProjectItem, TaskItem }