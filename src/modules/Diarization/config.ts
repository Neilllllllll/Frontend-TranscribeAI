import {DiarizationEnv} from '../../core/config/env.ts'

export const MAXTIMEPROCESSING = Number(DiarizationEnv.MAX_TIME_PROCESSING) || 3000000; // En millisecondes
export const TIMEBETTWENEACHPOLLING = Number(DiarizationEnv.TIME_BETWEEN_EACH_POLLING) || 3000; // En millisecondes
export const API_KEY = DiarizationEnv.API_KEY || "";
export const MAXSIZEAUDIO = Number(DiarizationEnv.MAX_SIZE_AUDIO) || 25;
export const MAXSPEAKERS = Number(DiarizationEnv.MAX_SPEAKERS) || 10;