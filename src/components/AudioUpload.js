// AudioUpload.js
import { useState, useEffect, useRef } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function AudioUpload({setRecorderURL}) {
    const [file, setFile] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    // Nettoyage de l'URL blob quand le composant est démonté ou quand le fichier change
    useEffect(() => {
    return () => {
        if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        }
    };
    }, [audioUrl]);

    const handleClick = () => {
        if (inputRef.current) {
        inputRef.current.click();
        } else {
        console.error("Référence introuvable");
        }
    };

    const handleFileChange = (event) => {
        setError(null);

        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            setFile(null);
            setAudioUrl(null);
            return;
        }

        // Vérification basique du type MIME (côté frontend, juste pour UX)
        if (!selectedFile.type.startsWith("audio/")) {
            setError("Le fichier sélectionné n'est pas un fichier audio.");
            setFile(null);
            setAudioUrl(null);
            return;
        }

        // Exemple : limitation de taille à 10 Mo
        const maxSizeBytes = 10 * 1024 * 1024;
        if (selectedFile.size > maxSizeBytes) {
            setError("Le fichier audio dépasse la taille maximale autorisée (10 Mo).");
            setFile(null);
            setAudioUrl(null);
            return;
        }

        setFile(selectedFile);

        // On libère l'ancienne URL blob si nécessaire
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }

        const newAudioUrl = URL.createObjectURL(selectedFile);
        setAudioUrl(newAudioUrl);
        setRecorderURL(newAudioUrl);
    };

    return (
    <>
        <input
            type="file"
            accept="audio/*"
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
