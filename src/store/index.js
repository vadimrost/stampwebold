import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


const useStore = create(persist((set, get) => ({
  data: {
    card: {
      cardBackground: { type: 'manual', color: '#B2CBC0' },
      stampBackground: { type: 'manual', color: '#E1F5FE' },
      cardText: 'Your text here',
      noOfStamps: 2,
      stamp: 'junkFood',
      logo: {
        type: 'manual',
        blob: 'pizza'
      }
    },
  },
  user: {},
  setCardData: (newItem) =>
    set((state) => ({
      data: { card: { ...state.data.card, ...newItem } }
    })),
  setInfoData: (newItem) =>
    set((state) => ({
      data: { ...state.data, ...newItem }
    })),
  removeData: () => set({
    data: {
      card: {
        cardBackground: { type: 'manual', color: '#B2CBC0' },
        stampBackground: { type: 'manual', color: '#E1F5FE' },
        cardText: 'Your text here',
        noOfStamps: 2,
        stamp: 'junkFood',
        logo: {
          type: 'manual',
          blob: 'pizza'
        }
      },
    }
  }),
  setUserData: (newUserData) => set({ user: newUserData })
}),
  {
    name: 'data', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  },));

export default useStore;
