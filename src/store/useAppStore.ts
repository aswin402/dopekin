import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Twin, Message } from '../types/twin';
import { DEFAULT_TWINS } from '../data/defaultTwins';

// Helper to safe-load from window.name if needed
const getWindowNameBridge = (): Twin[] => {
  try {
    if (typeof window !== 'undefined' && window.name) {
      const data = JSON.parse(window.name);
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    console.error('Failed to parse window.name bridge', e);
  }
  return [];
};

// Helper to save to window.name
const setWindowNameBridge = (twins: Twin[]) => {
  try {
    if (typeof window !== 'undefined') {
      window.name = JSON.stringify(twins);
    }
  } catch (e) {
    console.error('Failed to set window.name bridge', e);
  }
};

interface AppState {
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Twins
  twins: Twin[];
  addTwin: (twin: Twin) => void;
  deleteTwin: (id: string) => void;
  
  // Subscriptions & Tokens
  isPro: boolean;
  isElite: boolean;
  setPro: (pro: boolean) => void;
  setElite: (elite: boolean) => void;
  subscribedTwinIds: string[];
  subscribeToTwin: (id: string) => void;
  userTokens: number;
  addTokens: (amount: number) => void;
  claimDailyBonus: () => void;
  lastDailyClaim: string | null;

  // Conversations
  chats: Record<string, Message[]>;
  addMessage: (twinId: string, message: Message) => void;
  clearChat: (twinId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => {
      // Fetch initial custom twins from LocalStorage & window.name bridge
      const windowCustom = getWindowNameBridge();
      
      return {
        user: null,
        setUser: (user) => set({ user }),
        isLoading: false,
        setIsLoading: (isLoading) => set({ isLoading }),

        // Twins List
        twins: [...DEFAULT_TWINS, ...windowCustom],
        addTwin: (newTwin) => {
          const updatedCustom = getWindowNameBridge();
          const customTwin = { ...newTwin, isCustom: true };
          const newCustomList = [...updatedCustom, customTwin];
          setWindowNameBridge(newCustomList);
          
          set((state) => {
            // Avoid duplicate ids
            const filtered = state.twins.filter(t => t.id !== newTwin.id);
            return { twins: [...filtered, customTwin] };
          });
        },
        deleteTwin: (id) => {
          const updatedCustom = getWindowNameBridge().filter(t => t.id !== id);
          setWindowNameBridge(updatedCustom);
          
          set((state) => ({
            twins: state.twins.filter((t) => t.id !== id),
          }));
        },

        // Subscriptions
        isPro: false,
        isElite: false,
        setPro: (isPro) => set({ isPro }),
        setElite: (isElite) => set({ isElite }),
        subscribedTwinIds: [],
        subscribeToTwin: (id) => set((state) => {
          if (state.subscribedTwinIds.includes(id)) return {};
          return { subscribedTwinIds: [...state.subscribedTwinIds, id] };
        }),

        // Tokens/Daily bonus
        userTokens: 100,
        addTokens: (amount) => set((state) => ({ userTokens: state.userTokens + amount })),
        lastDailyClaim: null,
        claimDailyBonus: () => {
          const today = new Date().toDateString();
          if (get().lastDailyClaim === today) return;
          set((state) => ({
            userTokens: state.userTokens + 20,
            lastDailyClaim: today
          }));
        },

        // Chats history
        chats: {},
        addMessage: (twinId, message) => set((state) => {
          const twinChats = state.chats[twinId] || [];
          return {
            chats: {
              ...state.chats,
              [twinId]: [...twinChats, message],
            }
          };
        }),
        clearChat: (twinId) => set((state) => {
          const updatedChats = { ...state.chats };
          delete updatedChats[twinId];
          return { chats: updatedChats };
        }),
      };
    },
    {
      name: 'dopekin-state',
      // only persist serializable parts
      partialize: (state) => ({
        user: state.user,
        isPro: state.isPro,
        isElite: state.isElite,
        subscribedTwinIds: state.subscribedTwinIds,
        userTokens: state.userTokens,
        lastDailyClaim: state.lastDailyClaim,
        chats: state.chats,
      }),
    }
  )
);
