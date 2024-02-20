import { Box, Typography } from '@mui/material';
import PersistentDrawerLeft from '../components/PersistentDrawerLeft';


function Groups() {
  return (
    <PersistentDrawerLeft>
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Groups Page
        </Typography>
      </Box>
    </PersistentDrawerLeft>
  );
}

export default Groups
