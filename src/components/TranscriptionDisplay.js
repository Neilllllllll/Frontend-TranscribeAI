/* Component that display the transcribed text */
/* 
A faire : 
Faire une div scrollable dans laquelle la transcription sera affiché

Faire une affichage conditionnel du CircularProgressWithLabel en fonction de l'état de la retranscription

On fait l'appel API dans le parent et on passe le texte en props

Faire un affichage animer du texte qui s'affiche au fur et à mesure de la retranscription (genre un effet machine à écrire)

Mettre un effet de scroll automatique vers le bas quand le texte s'allonge

Mettre un bouton pour copier le texte dans le presse papier

Pouvoir changer une chaine de caractère dans le texte et cela pour tout le texte (genre corriger une faute de retranscription)

Indiquer en fonction de la position de lecture de l'audio quelle partie du texte est en train d'être lue (genre surligner la phrase en cours de lecture)

Faire d'afficher des timestamps cliquables dans le texte pour aller à un moment précis de l'audio

Gérer le cas où y'a pas de texte retranscrit (genre afficher un message "Rien n'a été retranscrit pour l'instant") ?

Se renseigner pour défiinr une key pour chaque token

*/

import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

export default function TranscriptionDisplay({transcription}) {
    return(
        <>
            <Box sx = {{ width: '100%'}}>
                <Box>
                    {transcription ? transcription.map((token) => {
                        return <Typography> {token.title}</Typography>
                    }) : "Rien n'a été retranscrit pour l'instant"}
                </Box>
            </Box>
        </>
    );
};