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

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    private element: HTMLFormElement;

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;        
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";
        this.configure();
        this.attach();
        this.titleInputElement = document.getElementById('title')! as HTMLInputElement;
        this.descriptionInputElement = document.getElementById('description')! as HTMLInputElement;
        this.peopleInputElement = document.getElementById('people')! as HTMLInputElement;          
}

    private attach() {
        this.hostElement.append(this.element);
    }

    
    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        let userInput = this.gatherUserInput();
        console.log("userInputArray", userInput);
        if(Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log("title", title);
            console.log("description", description);
            console.log("people", people);
            this.clearInputs();
        }
        

    }

    private gatherUserInput(): [string, string, number] | void {
        if(this.titleInputElement.value.trim().length === 0 || this.descriptionInputElement.value.trim().length === 0 || this.peopleInputElement.value.trim().length === 0) {
            alert('Invalid input, please try again');
            return;
        }
        let enteredTitle = this.titleInputElement.value;
        let enteredDescription = this.descriptionInputElement.value;
        let enteredPeople = this.peopleInputElement.value;
        return [enteredTitle, enteredDescription, +enteredPeople];             
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}

export default ProjectInput;