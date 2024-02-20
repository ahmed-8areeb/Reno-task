import { Box, Typography } from '@mui/material';


const WelcomeScreen = () => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Reno Company
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for choosing Reno.
      </Typography>
    </Box>
  );
};


export default WelcomeScreen;
