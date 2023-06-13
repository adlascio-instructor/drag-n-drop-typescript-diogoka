class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    private element: HTMLElement;

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;        
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
        
    }

    private attach() {
        this.hostElement.append(this.element);
    }

    private renderContent() {
        let listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector(`h2`)!.textContent = this.type.toUpperCase() + ' PROJECTS';
   
    }
}

export default ProjectList;