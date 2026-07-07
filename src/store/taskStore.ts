import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
}

export type StatusFilter = 'all' | 'active' | 'completed';
export type PriorityFilter = 'all' | Priority;

interface TaskStore {
  tasks: Task[];
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  addTask: (title: string, priority: Priority, dueDate?: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setPriorityFilter: (filter: PriorityFilter) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      statusFilter: 'all',
      priorityFilter: 'all',
      addTask: (title, priority, dueDate) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              priority,
              completed: false,
              dueDate: dueDate ?? null,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
    }),
    { name: 'taskflow-storage' }
  )
);
