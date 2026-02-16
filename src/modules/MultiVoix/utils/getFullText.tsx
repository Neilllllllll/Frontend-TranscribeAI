import type {DiarizationState} from "../types/ui_data.type.ts";
// Fonction pour obtenir le texte complet à partir de la structure de diarization
export const fullText = (param: DiarizationState): string => {
    let text = '';
    let name = '';
    for (const bulle of param.conversationFlow) {
        name = param.speakersById[bulle.speakerId]?.name || bulle.speakerId;
        text += `\n[${name}]: \n`;
        for (const segment of bulle.segments) {
            text += segment.text + ' ';
        }
    }
    return text.trim();
};