/* Component displaying a loading bar with progress percentage */
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface LoadingBarProgressProps {
  progress: number;
}

export default function LoadingBarProgress({progress}: LoadingBarProgressProps) {
  return (
    <Box sx={{ width: '60%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={progress}/>
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}