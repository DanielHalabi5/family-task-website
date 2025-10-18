import { create } from 'zustand';
import { fetchTasks } from '../api';

const useTasksStore = create((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
    updateTasksFunction: (task) => set((state) => ({ tasks: state.tasks.map(no => no.id === task.id ? task : no) })),
    removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((no) => no.id !== id) })),
    fetchTasks: async (token) => {
        const data = await fetchTasks(token);
        set({ tasks: data });
    },
}))

export default useTasksStore; 