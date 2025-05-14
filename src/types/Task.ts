export interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high'
}

export type FilterStatus = 'all' | 'active' | 'completed';