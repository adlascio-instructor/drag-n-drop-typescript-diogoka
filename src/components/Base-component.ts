abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, newElementId?: string) {
        this.templateElement = document.getElementById(`${templateId}`)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(`${hostElementId}`)! as T;            
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        this.element.id = `${newElementId}`;
        this.attach();
        // this.renderContent(); ver com o Arthur       
    }

    protected attach() {
        this.hostElement.append(this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;

}

export default Component;