import { create } from 'zustand';

const useFamilyStore = create((set) => ({
    families: [],
    setFamily: (family) => set({ families }),
    addFamily: (family) => set((state) => ({ families: [family, ...state.families] })),
//     updateNoteFunction: (note) => set((state) => ({ notes: state.notes.map(no => no.id === note.id ? note : no) })),
//     removeNote: (id) => set((state) => ({ notes: state.notes.filter((no) => no.id !== id) })),


}))

export default useFamilyStore; 