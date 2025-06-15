import { User, Role } from '../types';

export function describeUser(user: User): string {
    return `${user.name} (${user.email}) - ${user.role} - ${user.status}`;
}

export function isAdmin(user: User): user is User & { role: Role.ADMIN } {
    return user.role === Role.ADMIN;
}

export function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
} 