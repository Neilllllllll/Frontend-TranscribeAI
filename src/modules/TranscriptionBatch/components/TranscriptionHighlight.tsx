import { useEffect, useRef, useState, useMemo } from 'react';
import CopyButton from '../../../Shared/components/CopyButton.tsx';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TranscriptionSegment } from '../types/getterSchema.ts';
import { useTheme } from '@mui/material/styles';
import WordReplacement from './WordReplacement.tsx';
import {Stack} from '@mui/material';

interface Props {
  segments: TranscriptionSegment[] | null;
  currentTime: number;
  goToTimestamp?: (time: number) => void;
  search: string,
  replacement: string
}

export default function TranscriptionDisplay({ segments, currentTime, goToTimestamp }: Props) {
  // 1. On stocke les segments dans un état local pour permettre l'édition
  const [editableSegments, setEditableSegments] = useState<TranscriptionSegment[]>([]);
  const activeSegmentRef = useRef<HTMLSpanElement>(null);
  const theme = useTheme();

  // Mise à jour de l'état local dès que les segments arrivent
  useEffect(() => {
    if (segments) {
      setEditableSegments(segments);
    }
  }, [segments]);

  // 2. Scroll automatique vers le segment actif
  useEffect(() => {
    if (activeSegmentRef.current) {
      activeSegmentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentTime]);

  // 3. Gestion de l'édition d'un segment
  const handleUpdateSegment = (id: number, newText: string) => {
    setEditableSegments(prev => 
      prev.map(s => s.id === id ? { ...s, text: newText } : s)
    );
  };

  // 4. Fonction pour le "Chercher et Remplacer" global
  {/* 
      UseEffect(() =>{
      const handleGlobalReplace = (search: string, replacement: string) => {
      if (!search.trim()) return;
      setEditableSegments(prev => 
        prev.map(s => ({
          ...s,
          text: s.text.split(search).join(replacement) // Remplacement propre
        }))
      );
    };
    handleGlobalReplace(search, replacement)
  }), [search, replacement]
  */}


  
  const handleGlobalReplace = (search: string, replacement: string) => {
    if (!search.trim()) return;
    setEditableSegments(prev => 
      prev.map(s => ({
        ...s,
        text: s.text.split(search).join(replacement) // Remplacement propre
      }))
    );
  };

  // On prépare le texte complet pour le bouton de copie
  const fullText = useMemo(() => 
    editableSegments.map(s => s.text).join(' '), 
    [editableSegments]
  );

return (
    <Paper elevation={0} sx={{ width: "100%", height: "70vh", p: 2, 'display': "flex", "flexDirection": "column"}}>
      <Box>
        <CopyButton textToCopy={fullText}></CopyButton>
      </Box>

      <Box sx={{ height: "95%", overflowY: "auto" }}>
        {!segments ? <Typography>Votre transcription s'affichera ici ...</Typography> : null}
        {editableSegments.map((segment) => {
          const isActive = currentTime >= segment.start && currentTime <= segment.end;

          return (
            <Box
              key={segment.id}
              ref={isActive ? activeSegmentRef : null}
              component="span"
              onClick={() => goToTimestamp?.(segment.start)}
              sx={{
                display: 'inline', 
                backgroundColor: isActive ? theme.palette.text.highlight : 'transparent'
              }}
            >
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleUpdateSegment(segment.id, e.currentTarget.innerText)}
              >
                {segment.text}
              </span>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}