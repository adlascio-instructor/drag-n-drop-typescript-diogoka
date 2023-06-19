import { Validatable, validate } from "../helpers/validation.js";
import { projectState } from "./ProjectState.js";
import Component from "./Base-component.js";

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

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {


    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super("project-input", "app","user-input");     
        this.configure();
        this.titleInputElement = document.getElementById('title')! as HTMLInputElement;
        this.descriptionInputElement = document.getElementById('description')! as HTMLInputElement;
        this.peopleInputElement = document.getElementById('people')! as HTMLInputElement;          
}
    renderContent() {}

    
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        let userInput = this.gatherUserInput();        
        if(Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people, 'ACTIVE');
            this.clearInputs();
        }
        

    }

    private gatherUserInput(): [string, string, number] | void {
        let enteredTitle = this.titleInputElement.value;
        let enteredDescription = this.descriptionInputElement.value;
        let enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
        }
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 14
        }
        if(!validate(titleValidatable)) {
            alert('Insert a valid title.');
            return;
        }
        if(!validate(descriptionValidatable)) {
            alert('Insert a valid description.');
            return;
        }
        if(!validate(peopleValidatable)) {
            alert('Insert a valid number of people.');
            return;
        }



        return [enteredTitle, enteredDescription, +enteredPeople];             
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}

export default ProjectInput;