import { useState, useRef, useEffect } from "react";
// Import a class that allows to record
import Recorder from '../utils/Recorder';
// Import icons from material UI
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ListItemIcon from '@mui/material/ListItemIcon';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TimerIcon from '@mui/icons-material/Timer';

// Import components from material UI
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useTheme } from '@mui/material/styles';

import Timer from './Timer';

export default function AudioRecorder({ onRecordEnd }){
    const theme = useTheme();
    const [isRecording, setIsRecording] = useState(false);
    const [isPause, setIsPause] = useState(false);

    const audioRecorderRef = useRef(null);
    // Initialize the audio recorder at the first render
    useEffect(() => {
        const recorder = new Recorder();
        recorder.init();
        audioRecorderRef.current = recorder;
    }, []);

    // start recording
    const handlerStartRecording = () => {
        setIsRecording(true);
        audioRecorderRef.current?.start();
    };

    // pause recording
    const handlerPauseRecording = () => {
        setIsPause(!isPause);
        if(isPause){
        audioRecorderRef.current?.resume();
        return;
        }
        audioRecorderRef.current?.pause();
    }

    // stop recording and return blob to parent component
    const handlerStopRecording = async () => {
        setIsRecording(false); 
        setIsPause(false);
        const blob = await audioRecorderRef.current?.stop();
        if (!blob) {
        onRecordEnd(null);
        return;
        }
        onRecordEnd(blob.audioBlob, "audio/webm");
    }
    return(
        <>
            {/* Bouton ENREGISTRER */}
            <ListItem disablePadding>
                <ListItemButton disabled={isRecording} onClick={handlerStartRecording}>
                    <ListItemIcon>
                        <FiberManualRecordIcon sx={isRecording ? { color: theme.palette.element.iconHover } : undefined}/>
                    </ListItemIcon>
                    <ListItemText primary="Enregistrer" />
                </ListItemButton>
            </ListItem>
            {/* Bouton PAUSE */}
            <ListItem disablePadding>
                <ListItemButton disabled={!isRecording} onClick={handlerPauseRecording}>
                    <ListItemIcon>
                        {!isPause ? <PauseIcon /> : <PlayArrowIcon />}
                    </ListItemIcon>
                    <ListItemText primary={!isPause ? "Pause" : "Reprendre"} />
                </ListItemButton>
            </ListItem>
            {/* Bouton STOP */}
            <ListItem disablePadding>
                <ListItemButton disabled={!isRecording} onClick={handlerStopRecording}>
                    <ListItemIcon>
                        <StopIcon />
                    </ListItemIcon>
                    <ListItemText primary="Stop" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <TimerIcon />
                </ListItemIcon>
                <Timer isRecording={isRecording} isPause = {isPause}/>
            </ListItem>
        </>
    );
}