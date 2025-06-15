import { Project, User } from '../types';
import { findById } from '../utils/userUtils';
import { NotificationService } from '../types';

export class ProjectManager {
    private projects: Project[] = [];
    private notificationService: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
    }

    addProject(project: Project): void {
        if (findById(this.projects, project.id)) {
            this.notificationService.notify(`Project with ID ${project.id} already exists`);
            return;
        }
        this.projects.push(project);
        this.notificationService.notify(`Project "${project.name}" added successfully`);
    }

    removeProject(id: number): void {
        const projectIndex = this.projects.findIndex(p => p.id === id);
        if (projectIndex === -1) {
            this.notificationService.notify(`Project with ID ${id} not found`);
            return;
        }
        const project = this.projects[projectIndex];
        this.projects.splice(projectIndex, 1);
        this.notificationService.notify(`Project "${project.name}" removed successfully`);
    }

    addUserToProject(projectId: number, user: User): void {
        const project = findById(this.projects, projectId);
        if (!project) {
            this.notificationService.notify(`Project with ID ${projectId} not found`);
            return;
        }

        if (findById(project.members, user.id)) {
            this.notificationService.notify(`User ${user.name} is already a member of project "${project.name}"`);
            return;
        }

        project.members.push(user);
        this.notificationService.notify(`User ${user.name} added to project "${project.name}"`);
    }

    listProjects(): Project[] {
        return [...this.projects];
    }
} 