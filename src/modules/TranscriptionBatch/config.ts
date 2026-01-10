import {BatchTranscriptionEnv} from '../../core/config/env.ts'

export const MAXTIMEPROCESSING = BatchTranscriptionEnv.MAXTIMEPROCESSING;
export const TIMEBETTWENEACHPOLLING = BatchTranscriptionEnv.TIMEBETTWENEACHPOLLING;
export const API_KEY = BatchTranscriptionEnv.API_KEY;
export const MAXSIZEAUDIO = Number(BatchTranscriptionEnv.MAXSIZEAUDIO) || 15;