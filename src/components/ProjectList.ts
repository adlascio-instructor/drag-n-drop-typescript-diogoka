import { projectState } from "./ProjectState.js";
import Component from "./Base-component.js";

class ProjectList extends Component<HTMLDivElement, HTMLUListElement> {

    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super("project-list", "app",`${type}-projects`);
        this.renderContent();
        this.configure();        
    }
    
    configure() {
        projectState.addListener((projects: Project[]) => {
            if(this.type === 'active'){
                this.assignedProjects = projects;
                this.renderProjects();
            } else {
                return;
            }
        })
        
    }

    renderContent() {
        let listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        const title = this.type + ' PROJECTS';     
        this.element.querySelector(`h2`)!.textContent = title.toUpperCase();
   
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