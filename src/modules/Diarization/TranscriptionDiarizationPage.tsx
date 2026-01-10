import { useState, useEffect } from "react";
import Toolbox from "../../Shared/components/ToolBox.tsx";
import AudioPlayer from "../../Shared/components/AudioPlayer.tsx";
import AudioRecorder from "../../Shared/components/AudioRecorder.tsx";
import AudioUpload from "../../Shared/components/AudioUpload.tsx";
import LoadingBarProgress from "../../Shared/components/loadingBarProgress.tsx";
import SpeakerBubble from './components/SpeakerBubble.tsx';

// UI Material
import { Box, TextField, Typography, Divider, Paper } from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import Alert from '@mui/material/Alert';

// Services & Types
import { createJob } from "./services/postAudio.tsx";
import { getDiarizationByUuid } from "./services/getDiarization.tsx";
import type { Audio } from "../../Shared/types/audio.types.ts";
import type { AlertState } from "../../Shared/types/alert.types.ts";
import type { DiarizationData } from "./types/diarization.types.ts";

export default function DiarizationPage() {
  const [audio, setAudio] = useState<Audio | null>(null);
  const [{ alert, alertType }, setAlert] = useState<AlertState>({ alert: "", alertType: "info" });
  
  // State pour les résultats et paramètres
  const [diarization, setDiarization] = useState<DiarizationData | null>(null);
  const [numSpeakers, setNumSpeakers] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queuePos, setQueuePos] = useState<number | null>(null);

  // Fonction appelée par l'upload ou le record
  const handleAudioSetter = (newAudio: Audio) => {
    setAudio({
      blob: newAudio.blob,
      mimeType: newAudio.mimeType,
      filename: newAudio.filename
    });
    // On reset l'affichage précédent
    setDiarization(null);
    setAlert({ alert: null, alertType: "info" });
  };

useEffect(() => {
    // En seconde
    const pollInterval = 3000;
    const maxTime = 300000;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDiarization = async () => {
      if (!audio) return;

      setIsLoading(true);
      try {
        // Create a new transcription job
        const job_uuid = await createJob(audio, signal);
        // Polling for the transcription result
        let diarizationResult: DiarizationData | null = null;
        let attempts = 0;
        const maxAttempts = maxTime/pollInterval;

        while (attempts < maxAttempts && !signal.aborted) {
          diarizationResult = await getDiarizationByUuid(job_uuid, signal);
          if (diarizationResult) {
            break;
          }
          attempts += 1;
          await new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, pollInterval);
            // Si le signal est avorté pendant le dodo, on rejette pour sortir du try/catch
            signal.addEventListener('abort', () => {
              clearTimeout(timer);
              reject(new DOMException('Aborted', 'AbortError'));
            }, { once: true });
          });
        }

        if (!signal.aborted) {
          if (diarizationResult) {
            setDiarization(diarizationResult);
            setAlert({alert: "Diarization réussie!", alertType: "success"});
          } else {
            setAlert({alert: "Délai dépassé", alertType: "error"});
          }
        }
      } catch (error: any) {
          if (error.name === 'AbortError') {
            console.log('aborted');
          } else {
            setAlert({alert: `Erreur: ${error.message}`, alertType: "error"});
          }
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    };
    fetchDiarization();
    return () => {
      controller.abort();
    };
  }, [audio]);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: "100%"}}>
      <Toolbox>

      </Toolbox>
      coucou
    </Box>
  );
}