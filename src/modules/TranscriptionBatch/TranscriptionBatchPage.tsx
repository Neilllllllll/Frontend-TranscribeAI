/* Main page for audio transcription */
import { useEffect, useState, useRef } from "react";
import Box from '@mui/material/Box';
import ToolBox from '../../Shared/components/ToolBox.tsx'
// Import our components
import TranscriptionHighlight from './components/TranscriptionHighlight.tsx';
import AudioUpload from '../../Shared/components/AudioUpload.tsx';
import AudioPlayer from '../../Shared/components/AudioPlayer.tsx';
import AudioRecorder from '../../Shared/components/AudioRecorder.tsx';
import LoadingBarProgress from '../../Shared/components/loadingBarProgress.tsx';
import {useAlert} from '../../Shared/contexts/AlertContext.tsx'
import type { Audio } from "../../Shared/types/audio.types.ts";
import WordReplacement from './components/WordReplacement.tsx'
import Chip from '@mui/material/Chip';
// Import API function
import { createJob } from "./services/createJob.tsx";
import { getTranscriptionByUuid } from "./services/getTranscritpion.tsx";
import type { getStatusAPIResponse } from "./types/getterSchema.ts"
// Import env
import { MAXTIMEPROCESSING, TIMEBETTWENEACHPOLLING, MAXSIZEAUDIO } from "./config.ts"; 
import { Divider } from "@mui/material";

export default function TranscriptionBatchPage() {
  const { showAlert } = useAlert();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isToolboxOpen, setIsToolboxOpen] = useState(true);
  const [audio, setAudio] = useState<Audio | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [transcriptionPayload, setTranscriptionTranscriptionPayload] = useState<getStatusAPIResponse | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to handle audio setting from child components
  const handleAudioSetter = (newAudio: Audio) => {
    setAudio((prevAudio) => {
      // Si on a déjà un audio et que le blob est le même, on ne change rien
      // (Le re-render ne sera pas déclenché)
      if (prevAudio?.blob === newAudio.blob) {
        return prevAudio;
      }
      return {
        blob: newAudio.blob,
        mimeType: newAudio.mimeType,
        filename: newAudio.filename
      };
    });
  };

  // Fonction permettant de deplacer le curseur audio
  const handleSeek = (seconds: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = seconds;
            audioRef.current.play().catch(e => console.log("Lecture auto bloquée par le navigateur"));
        }
  };

  // Logique de polling
  useEffect(() => {
    // En seconde
    const pollInterval = Number(TIMEBETTWENEACHPOLLING) || 3000;
    const maxTime = Number(MAXTIMEPROCESSING) || 3000000;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTranscription = async () => {
      if (!audio) return;

      setIsLoading(true);
      try {
        // Create a new transcription job
        const jobPayload = await createJob(audio, signal);
        showAlert(jobPayload.data.status, jobPayload.status);

        // Polling for the transcription result
        let transcriptionResult: getStatusAPIResponse | null = null;
        let attempts = 0;
        const maxAttempts = maxTime/pollInterval;

        while (attempts < maxAttempts && !signal.aborted) {
          transcriptionResult = await getTranscriptionByUuid(jobPayload.data.job_uuid, signal);
          // Cas où on a reçu la transcription
          if (transcriptionResult.data.status === "COMPLETED") {
            setTranscriptionTranscriptionPayload(transcriptionResult);
            showAlert("Transcription réussi, Durée du temps de traitement : " + transcriptionResult.data.transcription_time, "success");
            return;
          }
          else if(transcriptionResult.data.status === "FAILED"){
            showAlert(transcriptionResult.data.error_message ?? "Une erreur inconnue s'est produite", "error");
            return;
          }
          // Cas où le job est dans la file d'attente
          else if(transcriptionResult.data.status === "PENDING"){
            showAlert("Votre demande est dans la file d'attente. Position : " + transcriptionResult.data.position, "info")
          }
          // Cas où le job est en cours de transcription
          else if(transcriptionResult.data.status === "PROCESSING"){
            showAlert("Votre audio est entrain d'être traité ", "info");
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
          showAlert("Délai dépassé", "error");
        }
      } catch (error: any) {
          if (error.name === 'AbortError') {
            console.log('aborted');
          } else {
            showAlert(`Erreur: ${error.message}`, "error");
          }
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    };
    fetchTranscription();
    return () => {
      controller.abort();
    };
  }, [audio]);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: "100%"}}>
    <ToolBox open={isToolboxOpen} setOpen={setIsToolboxOpen}>
      {/* Section 1 : Entrée Audio */}
      {
        isToolboxOpen && 
        <Divider sx={{ my: 2, width: '90%' }}>
          <Chip label="Entrée Audio" size="small" sx={{ fontSize: '0.65rem' }} />
        </Divider>
      }
      <Box sx={{ p: isToolboxOpen ? 1 : 0, width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <AudioRecorder onRecordEnd={handleAudioSetter} />
        <AudioUpload onUploadEnd={handleAudioSetter} MAXSIZEBYTES_VAL={MAXSIZEAUDIO}/>
      </Box>

      {/* Section 2 : Edition */}
      { isToolboxOpen && 
      <>
        <Divider sx={{ my: 2, width: '90%' }}>
          <Chip label="Édition" size="small" sx={{ fontSize: '0.65rem' }} />
        </Divider>

        <Box sx={{ p: 1, width: '100%' }}>
          <WordReplacement />
        </Box>
      </>

      }
      </ToolBox>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx ={{
          width : "100%",
          height : "100%",
          display : 'flex',
          flexDirection :"column",
          alignItems : 'center',
          gap : 2
        }}>
          <TranscriptionHighlight segments={transcriptionPayload?.data.status === "COMPLETED" ? transcriptionPayload.data.result?.segments : null} currentTime={currentTime} goToTimestamp={handleSeek}></TranscriptionHighlight>
          { isLoading && <LoadingBarProgress /> }
          <AudioPlayer ref={audioRef} audio = {audio} setCurrentTime={setCurrentTime} />
        </Box>
      </Box>
    </Box>
  );
}
