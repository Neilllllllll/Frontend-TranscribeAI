import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/images/logo-ch-vauclaire.svg';
import { AppBar, Drawer, DrawerHeader } from '../styles/Home.styles';
import Exporter from '../components/Exporter';
import ListSubheader from '@mui/material/ListSubheader';

// Import des components dans le dossier src
import TranscriptionDisplay from '../components/TranscriptionDisplay';
import AudioUpload from '../components/AudioUpload';
import AudioPlayer from '../components/AudioPlayer';
import AudioRecorder from '../components/AudioRecorder';
// Import des Icons

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';


export default function AudioTranscriptionPage() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState(null);
  const [transcription, setTranscription] = useState("null");

  const handleRecordEnd = (blob, mimeType) => {
    setAudio({
      blob: blob,
      mimeType: mimeType,
      filename: "recorded-audio.webm"
    });
    setTranscription("");
    setError(null);
  };

  const handleUploadEnd = (file) => {
    setAudio({
      blob: file,
      mimeType: file.type,
      filename: file.name
    });
    setTranscription("");
    setError(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Header */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            sx={{
              height: 40,
              marginRight: 2,
            }}
            alt="Logo CH Vauclaire"
            src={logo}
          />
          <Typography variant="h1">
            Transcribe AI 
          </Typography>
        </Toolbar>
      </AppBar>

       {/* Fin du Header */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant='h2'>Boîte à outils</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List
          subheader={
          <ListSubheader component="div" id="nested-list-subheader">
              {open ? "Dictée à temps réel" : " " }
          </ListSubheader>}
        >
          <AudioRecorder onRecordEnd = {handleRecordEnd}/>
        </List>

        <Divider/>
        <List>
            {/* Bouton Téléverser un fichier */}
            <AudioUpload onUploadEnd = {handleUploadEnd} setError={setError} />
            {/* Bouton programmer une retranscription */}
            <ListItem disablePadding>
              <ListItemButton disabled={true}>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Planifier" />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        <List
          subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {open ? "Options d'exportation" : " " }
          </ListSubheader>}
        >
          <Exporter texteToExport = {transcription}/>
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
        {/* Créer un composant qui prend en props le fichier audio et affiche la transcription ? */}
        <Box sx ={{
          width : "100%",
          display : 'flex',
          flexDirection :"column",
          alignItems : 'center',
          gap : 2
        }}>
          <TranscriptionDisplay transcription = {transcription}/>
          <Typography> {error} </Typography>
          <AudioPlayer blob = {audio?.blob}/>
        </Box>
      </Box>
    </Box>
  );
}
