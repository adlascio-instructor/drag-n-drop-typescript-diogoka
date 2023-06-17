import Component from "./Base-component.js";
import { Draggable } from "../helpers/drag-drop.js";

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


class ProjectItem extends Component<HTMLDivElement, HTMLFormElement> implements Draggable{
    project: Project;
    title: string;
    people: number;
    description: string;
    id: string;
    

    constructor(hostId: string, project: Project) {
        super("single-project", hostId, project.id);
        this.project = project;
        this.title = project.title;
        this.people = project.people;
        this.description = project.description;
        this.id = project.id;
        this.configure();
        this.renderContent();
    }
    
    @Autobind
    dragStartHandler(event: DragEvent): void {       
        event.dataTransfer!.setData("text/plain", this.id);
        event.dataTransfer!.effectAllowed = "move";
        
    }
    @Autobind
    dragEndHandler(event: DragEvent): void {
        console.log(event, 'dragEnd');
    }

    configure(){
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {     
        this.element.querySelector('h2')!.textContent = this.title;       
        this.element.querySelector('h3')!.textContent = this.members;
   
        
        this.element.querySelector('p')!.textContent = this.description;
    }

    get members() : string{
        if (this.people === 1){
            return '1 member';
        } else {
            return `${this.people} members`;
        }
    }
}

export default ProjectItem;