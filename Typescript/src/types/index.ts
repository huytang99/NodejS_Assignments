export enum Role {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    DEVELOPER = 'DEVELOPER'
}

export type Status = 'ACTIVE' | 'INACTIVE';

export interface User {
    readonly id: number;
    name: string;
    email: string;
    role: Role;
    status: Status;
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    members: User[];
}

export interface NotificationService {
    notify(message: string): void;
} 