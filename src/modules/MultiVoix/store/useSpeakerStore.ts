import { create } from 'zustand';
import type { Speaker } from '../types/ui_data.type.ts';

interface SpeakerState {
  speakersById: Record<string, Speaker>;
  
  // Actions
  setSpeakers: (speakers: Record<string, Speaker>) => void;
  updateSpeaker: (id: string, updates: Partial<Speaker>) => void;
  getSpeakerList: () => Speaker[];
}

export const useSpeakerStore = create<SpeakerState>((set, get) => ({
  speakersById: {},

  // Initialise ou écrase la liste
  setSpeakers: (speakers) => set({ speakersById: speakers }),

  // Met à jour un speaker spécifique (Nom, Couleur, etc.)
  updateSpeaker: (id, updates) => set((state) => ({
    speakersById: {
      ...state.speakersById,
      [id]: { ...state.speakersById[id], ...updates }
    }
  })),

  // Utilitaire pour transformer l'objet en tableau pour les .map()
  getSpeakerList: () => Object.values(get().speakersById),
}));