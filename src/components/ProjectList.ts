import { projectState } from "./ProjectState.js";
import Component from "./Base-component.js";
import ProjectItem from "./ProjectItem.js";
import { DragTarget } from "../helpers/drag-drop.js";

const Autobind = (
  _target: any,
  _methodName: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
};

class ProjectList extends Component<HTMLDivElement, HTMLUListElement> implements DragTarget{

    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super("project-list", "app",`${type}-projects`);
        this.configure();        
        this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        this.element.querySelector('ul')!.classList.add('droppable');
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            console.log('preventDefault');
        }

        
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        console.log("dataTransferDropHandler", event.dataTransfer!.getData('text/plain'));
        let projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? "ACTIVE" : "FINISHED");
        
        
    }

    @Autobind
    dragLeaveHandler(event: DragEvent): void {
        console.log(event, 'dragLeave');
        this.element.querySelector('ul')!.classList.remove('droppable');
        
    }
    
    configure() {
        let ul = this.element.querySelector('ul')!;
        
        ul.addEventListener('dragover', this.dragOverHandler);
        ul.addEventListener('drop', this.dropHandler);
        ul.addEventListener('dragleave', this.dragLeaveHandler);

        projectState.addListener((projects: Project[]) => {         
            this.assignedProjects = projects.filter(project => {
                if(this.type === 'active') {
                    return project.status === "ACTIVE";
                }
                return project.status === "FINISHED";
            })
            this.renderProjects();
        })

        
    }

    renderContent() {
        let listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector(`h2`)!.textContent = this.type.toUpperCase() + ' PROJECTS';
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