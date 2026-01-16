import { BulleTextDiarization, Speaker } from '../types/ui_data.type';
import { DiarizationResult } from '../types/api_data.types';
import {DiarizationState, Speaker as SpeakerType} from '../types/ui_data.type';

function generateRandomSpeaker(speakerId: string): SpeakerType {
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  return {
    id: speakerId,
    name: `Interlocuteur ${speakerId}`,
    color: randomColor
  };
}

// Convertit les données de l'API en format utilisable par l'UI
export const convertApiToUiData = (
  apiResult: DiarizationResult, 
): DiarizationState => {
  // Map qui recupère les speakers de l'API
  let speakersMap: Record<string, SpeakerType> = {}; 
  const bubbles: BulleTextDiarization[] = [];
  let currentBubble: BulleTextDiarization | null = null;

  apiResult.segments.forEach((segment) => {
    // Cas 1 : C'est le tout premier segment ou le speaker change
    if (!currentBubble || currentBubble.speakerId !== segment.speaker) {
      // Si une bulle était en cours, on la sauvegarde
      if (currentBubble) {
        bubbles.push(currentBubble);
      }

      // On initie une nouvelle bulle
      currentBubble = {
        speakerId: segment.speaker,
        segments: [segment]
      };
      // Récupère le speaker dans la map ou l'ajoute s'il n'existe pas
      if (!speakersMap[segment.speaker]) {
        speakersMap[segment.speaker] = generateRandomSpeaker(segment.speaker)
      }
    } 
    // Cas 2 : C'est toujours le même speaker
    else {
      currentBubble.segments.push(segment);
    }
  });

  // Ne pas oublier de pousser la dernière bulle
  if (currentBubble) {
    bubbles.push(currentBubble);
  }

  return { conversationFlow: bubbles, speakersById: speakersMap };
};