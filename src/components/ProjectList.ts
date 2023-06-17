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
        console.log(event.dataTransfer!.getData('text/plain'));
        
        
    }

    @Autobind
    dragLeaveHandler(event: DragEvent): void {
        console.log(event, 'dragLeave');
        this.element.querySelector('ul')!.classList.remove('droppable');
        
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

        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        
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