// import { create } from 'zustand';

// const useNotesStore = create((set) => ({
//     notes: [],
//     setNotes: (notes) => set({ notes }),
//     addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
//     updateNoteFunction: (note) => set((state) => ({ notes: state.notes.map(no => no.id === note.id ? note : no) })),
//     removeNote: (id) => set((state) => ({ notes: state.notes.filter((no) => no.id !== id) })),
// }))

// export default useNotesStore; 