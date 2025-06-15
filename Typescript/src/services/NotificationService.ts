import { NotificationService } from '../types';

export class ConsoleNotificationService implements NotificationService {
    notify(message: string): void {
        console.log(`[Notification] ${message}`);
    }
} 