// AudioUpload.js
// Componente for uploading audio files, it return the selected file to the parent component
import { useState, useRef } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function AudioUpload({onUploadEnd, setError}) {

    const MAXSIZEBYTES = 10 * 1024 * 1024;
    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef.current) {
        inputRef.current.click();
        } else {
        console.error("Référence introuvable");
        }
    };

    const handleFileChange = (event) => {

        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            return;
        }

        // Check basic MIME type (frontend side, just for UX)
        if (!selectedFile.type.startsWith("audio/") && selectedFile.type !== "video/mp4") {
            setError("Le fichier sélectionné n'est pas un fichier audio ou vidéo MP4.");
            return;
        }

        // Example: size limit to 10 MB
        if (selectedFile.size > MAXSIZEBYTES) {
            setError("Le fichier audio dépasse la taille maximale autorisée (10 Mo).");
            return;
        }
        setError(null);
        onUploadEnd(selectedFile);
    };

    return (
    <>
        <input
            type="file"
            accept="audio/*,video/mp4"
            hidden
            ref = {inputRef}
            onChange={handleFileChange}
        />
        <ListItem disablePadding>
            <ListItemButton disabled={false} onClick={handleClick}>
            <ListItemIcon>
                <UploadFileIcon />
            </ListItemIcon>
            <ListItemText primary="Téléverser" />
            </ListItemButton>
        </ListItem>
    </>
    );
}
