class ProjectState {
    private static instance: ProjectState;
    private projects: any[] = [];
    private listeners: any[] = [];

    private constructor() {}

    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }


    addProject(title: string, description: string, people: number) {
        let newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: people
        }
        this.projects.push(newProject);
        for(let listenerFn of this.listeners) {
            listenerFn([...this.projects]);
            
        }
    }
    addListener(listenerFn: Function) {
        this.listeners.push(listenerFn);
    }

}

export const projectState = ProjectState.getInstance();
