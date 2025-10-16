import { create } from 'zustand';
import { createJoinRequest } from '../api';

const useJoinRequestStore = create((set) => ({
    requests: [],

    sendJoinRequest: async (token, userId, familyId) => {
        const res = await createJoinRequest(token, userId, familyId);
        set((state) => ({ requests: [...state.requests, res.request] }));

    },
}));

export default useJoinRequestStore;