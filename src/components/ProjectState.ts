type Listener = (project: Project[]) => void;

class ProjectState {
    private static instance: ProjectState;
    private projects: Project[] = [];
    private listeners: Listener[] = [];

    private constructor() {}

    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }


    addProject(title: string, description: string, people: number, status: ProjectStatus) {
        let newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: people,
            status: status
            
        }
        this.projects.push(newProject);        
        this.updateListener();
        
        
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }
    
    updateListener(){
        for(let listenerFn of this.listeners) {
            listenerFn([...this.projects]);
            
        }
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        let foundProject = this.projects.find(project => project.id === projectId);
        if(foundProject && foundProject.status !== newStatus) {
            foundProject.status = newStatus;
            this.updateListener();
        }

    }

}

export const projectState = ProjectState.getInstance();
