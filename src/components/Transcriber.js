// Reçoit un fichier audio en props et appelle l'API pour la retrnascription
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';

export default function Transcriber({audioSource}){
    return(
        <Box>
            <Divider/>
            <audio controls src={audioSource}></audio>
        </Box>
    );
};