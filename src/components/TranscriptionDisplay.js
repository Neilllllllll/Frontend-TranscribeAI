import Box from "@mui/material/Box";
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function TranscriptionDisplay(){
    return(
        <>
            <Box sx = {{ width: '100%'}}>
                <TextareaAutosize
                minRows={3}
                maxRows={80}
                style={{width: '100%'}}>     
                Rien n'a été retranscrit pour l'instant
                </TextareaAutosize>
            </Box>
        </>
    );
};