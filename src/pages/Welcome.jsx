import { Box, Typography } from '@mui/material';
import PersistentDrawerLeft from '../components/PersistentDrawerLeft';

const WelcomeScreen = () => {
  return (
    <PersistentDrawerLeft>
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Reno Company
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for choosing Reno.
        </Typography>
      </Box>
    </PersistentDrawerLeft>
  );
};


export default WelcomeScreen;
