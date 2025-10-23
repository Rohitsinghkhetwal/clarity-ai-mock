import { create } from "zustand";


interface InterviewState {
  // State
  interviewCompletionData: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Actions
  setCompletionData: (data:any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  addCompletionData: (data:any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  // clearCompletionData: () => void;
  removeCompletionData: (id: string) => void;
}

const initialState = {
  interviewCompletionData: [],
};

 const useStore = create<InterviewState>((set) => ({
  ...initialState,

  // Set all completion data
  setCompletionData: (data) => set({ interviewCompletionData: data }),

  // Add single completion data
  addCompletionData: (data) =>
    set((state) => ({
      interviewCompletionData: [...state.interviewCompletionData, data],
    })),

  // Clear all completion data
  // clearCompletionData: () => set({ interviewCompletionData: [] }),

  // Remove specific completion data by id
  removeCompletionData: (id) =>
    set((state) => ({
      interviewCompletionData: state.interviewCompletionData.filter(
        (item) => item.id !== id
      ),
    })),
}));



export default useStore;