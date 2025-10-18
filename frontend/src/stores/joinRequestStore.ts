import { create } from 'zustand';
import { createJoinRequest, fetchRequests, approveJoinRequest, rejectJoinRequest } from '../api';

const useJoinRequestStore = create((set) => ({
    requests: [],
    setRequests: (requests) => set({ requests }),
    addRequest: (request) => set((state) => ({ requests: [...state.requests, request] })),
    removeRequest: (id) => set((state) => ({ requests: state.requests.filter((req) => req.id !== id) })),

    fetchRequests: async (token) => {
        const data = await fetchRequests(token);
        set({ requests: data });
    },

    approveRequest: async (token, requestId) => {
        await approveJoinRequest(token, requestId);
        set((state) => ({ requests: state.requests.filter((req) => req.id !== requestId) }));
    },

    rejectRequest: async (token, requestId) => {
        await rejectJoinRequest(token, requestId);
        set((state) => ({ requests: state.requests.filter((req) => req.id !== requestId) }));
    },

    sendJoinRequest: async (token, userId, familyId) => {
        const res = await createJoinRequest(token, userId, familyId);
        set((state) => ({ requests: [...state.requests, res.request] }));
    },

    clearStatus: () => set({ status: null }),
}));

export default useJoinRequestStore;