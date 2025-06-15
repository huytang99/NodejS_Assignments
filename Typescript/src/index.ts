import { Role, User, Project } from './types';
import { describeUser, isAdmin, findById } from './utils/userUtils';
import { ProjectManager } from './services/ProjectManager';
import { ConsoleNotificationService } from './services/NotificationService';

// Create some example users
const users: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: Role.ADMIN,
        status: 'ACTIVE'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: Role.MANAGER,
        status: 'ACTIVE'
    },
    {
        id: 3,
        name: 'Bob Wilson',
        email: 'bob@example.com',
        role: Role.DEVELOPER,
        status: 'ACTIVE'
    }
];

// Create example projects
const projects: Project[] = [
    {
        id: 1,
        name: 'Website Redesign',
        description: 'Modernizing the company website',
        members: []
    },
    {
        id: 2,
        name: 'Mobile App',
        description: 'New mobile application development',
        members: []
    }
];

// Initialize services
const notificationService = new ConsoleNotificationService();
const projectManager = new ProjectManager(notificationService);

// Add projects
projects.forEach(project => projectManager.addProject(project));

// Add users to projects
projectManager.addUserToProject(1, users[0]); // Add admin to Website Redesign
projectManager.addUserToProject(1, users[1]); // Add manager to Website Redesign
projectManager.addUserToProject(2, users[2]); // Add developer to Mobile App

// Try to add the same user again (should show notification)
projectManager.addUserToProject(1, users[0]);

// List all projects
console.log('\nAll Projects:');
projectManager.listProjects().forEach(project => {
    console.log(`\nProject: ${project.name}`);
    console.log('Members:');
    project.members.forEach(member => console.log(`- ${describeUser(member)}`));
});

// Demonstrate type guard
console.log('\nAdmin Users:');
users.forEach(user => {
    if (isAdmin(user)) {
        console.log(`${user.name} is an admin`);
    }
});

// Demonstrate generic findById
const foundUser = findById(users, 2);
if (foundUser) {
    console.log('\nFound user:', describeUser(foundUser));
}

// Demonstrate project removal
projectManager.removeProject(2);
console.log('\nAfter removing Mobile App project:');
projectManager.listProjects().forEach(project => {
    console.log(`- ${project.name}`);
}); 