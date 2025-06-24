
import { create } from 'zustand';

const useStore = create((set) => ({
    data: [],
    setData: (newData) => set({ data: newData }),
}));

export default useStore;
