import { create } from "zustand";

type Store = {
  count: number;
  inc: () => void;
};

const useStore = create<Store>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export function Counter() {
  const { count, inc } = useStore();
  return <button onClick={inc}>{count}</button>;
}
