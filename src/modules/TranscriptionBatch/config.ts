import {BatchTranscriptionEnv} from '../../core/config/env.ts'

export const MAXTIMEPROCESSING = Number(BatchTranscriptionEnv.MAX_TIME_PROCESSING) || 3000000;
export const TIMEBETTWENEACHPOLLING = Number(BatchTranscriptionEnv.TIME_BETWEEN_EACH_POLLING) || 3000;
export const API_KEY = BatchTranscriptionEnv.API_KEY || "";
export const MAXSIZEAUDIO = Number(BatchTranscriptionEnv.MAX_SIZE_AUDIO) || 15;