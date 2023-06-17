import { projectState } from "./ProjectState.js";
import Component from "./Base-component.js";
import ProjectItem from "./ProjectItem.js";

class ProjectList extends Component<HTMLDivElement, HTMLUListElement> {

    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super("project-list", "app",`${type}-projects`);
        this.configure();        
        this.renderContent();
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
      
        console.log("this.type", this.type);
        
        let listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector(`h2`)!.textContent = this.type.toUpperCase() + ' PROJECTS';


        // let listId = `${this.type}-projects-list`;
        // this.element.querySelector('ul')!.id = listId;
        // const title = this.type + ' PROJECTS';     
        // this.element.querySelector(`h2`)!.textContent = title.toUpperCase();
        
   
    }

    renderProjects() {
        let listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        listEl.textContent = '';
        for(let i = 0; i< this.assignedProjects.length; i++) {
            console.log(this.assignedProjects[i]);
            
            new ProjectItem(`${this.type}-projects-list`, this.assignedProjects[i]);
        }

    }
}

export default ProjectList;