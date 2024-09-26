import { create } from "zustand";

type RoutinesState = {
  addRoutine: boolean;
  // eslint-disable-next-line no-unused-vars
  setAddRoutine: (addRoutine: boolean) => void;
};

export const useRoutinesStore = create<RoutinesState>((set) => ({
  addRoutine: true,
  setAddRoutine: (addRoutine: boolean) => {
    set(() => ({
        addRoutine: addRoutine,
    }));
  },
}));
