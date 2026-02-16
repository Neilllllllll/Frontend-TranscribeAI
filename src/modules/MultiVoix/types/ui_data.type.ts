// Définition du texte de diarization après traitement
import type { DiarizationSegment } from "./api_data.types";

export interface Speaker {
  id: string;
  name: string;
  color: string;
  // icon: ReactElement; // Stocker une url plutot
}

export interface BulleTextDiarization {
  segments: DiarizationSegment[];
  speakerId: string
}

export interface DiarizationState {
  // 1. La liste ordonnée (pour l'affichage chronologique)
  conversationFlow: BulleTextDiarization[]; 
  // 2. La "Base de données" des speakers (pour l'accès O(1))
  speakersById: Record<string, Speaker>; 
}