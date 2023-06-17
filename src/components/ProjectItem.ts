import Component from "./Base-component.js";


class ProjectItem extends Component<HTMLDivElement, HTMLFormElement>{
    project: Project;
    title: string;
    people: number;
    description: string;
    

    constructor(hostId: string, project: Project) {
        super("single-project", hostId, project.id);
        this.project = project;
        this.title = project.title;
        this.people = project.people;
        this.description = project.description;
        this.configure();
        this.renderContent();
    }

    configure(){}

    renderContent() {     
        this.element.querySelector('h2')!.textContent = this.title;       
        this.element.querySelector('h3')!.textContent = this.people.toString();
        console.log("this.people",this.people);
        
        this.element.querySelector('p')!.textContent = this.description;
    }
}

export default ProjectItem;