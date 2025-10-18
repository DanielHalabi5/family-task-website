import { create } from 'zustand';
import { fetchFamilyMembers } from '../api';

const useFamilyStore = create((set) => ({
    families: [],
    setFamilies: (families) => set({ families }),
    addFamily: (family) => set((state) => ({ families: [family, ...state.families] })),
    //     updateNoteFunction: (note) => set((state) => ({ notes: state.notes.map(no => no.id === note.id ? note : no) })),
    //     removeNote: (id) => set((state) => ({ notes: state.notes.filter((no) => no.id !== id) })),

    fetchFamilies: async (token) => {
        const data = await fetchFamilyMembers(token);
        set({ families: data });
    },
}));

export default useFamilyStore; 