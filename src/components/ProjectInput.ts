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
        console.log(this.titleInputElement);
        
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
        console.log(this.titleInputElement.value);

    }
}

export default ProjectInput;