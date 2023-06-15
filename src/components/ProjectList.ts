import { projectState } from "./ProjectState.js";

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    private element: HTMLElement;
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;        
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
        projectState.addListener((projects: Project[]) => {
            if(this.type === 'active'){
                this.assignedProjects = projects;
                this.renderProjects();
            } else {
                return;
            }
        })
        
    }

    private attach() {
        this.hostElement.append(this.element);
    }

    private renderContent() {
        let listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector(`h2`)!.textContent = this.type.toUpperCase() + ' PROJECTS';
   
    }

    renderProjects() {
        let listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        listEl.textContent = '';
        for(let projectItem of this.assignedProjects) {
            let listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listEl.appendChild(listItem);
        }
    }
}

export default ProjectList;