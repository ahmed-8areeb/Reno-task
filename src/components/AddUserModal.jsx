import { useRef, useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  Alert,
  IconButton,
  Typography,
  InputLabel,
  FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BASE_URL = 'http://localhost:8000/';

const getCurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  return formattedDate;
};

const AddUserModal = ({ handleClose, isOpened, fetchData }) => {

  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [group, setGroup] = useState('');
  const [profile, setProfile] = useState('');

  const handleAddUser = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      const user = {
        name: formData.get('name'),
        userName: formData.get('userName'),
        email: formData.get('email'),
        group: formData.get('group'),
        status: 'Active',
        createdOn: getCurrentDate()
      }
      const response = await fetch(`${BASE_URL}employees`, {
        method: 'POST',
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      fetchData();
    } catch (error) {
      setErrorMessage(error.message);
    }
    finally {
      handleClose();
    }
  };

  return (
    <>
      <Modal open={isOpened} onClose={handleClose}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          maxWidth: '550px',
          margin: 'auto',
          marginTop: '50px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            marginBottom: '20px',
            color: '#FFF',
            backgroundColor: '#050E2D',
            borderRadius: '8px 8px 0 0',
          }}>
            <Typography variant="h6" style={{ marginRight: 'auto' }}>Add New User</Typography>
            <IconButton onClick={handleClose} style={{ color: '#FFF' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <form onSubmit={handleAddUser} ref={formRef} style={{ padding: '0 20px 20px 20px', backgroundColor: '#F8FAFB', borderRadius: '0  0 8px 8px' }}>
            <Typography variant="subtitle1" sx={{ marginBottom: '1px', marginTop: '2px' }}>Full Name</Typography>

            <TextField
              fullWidth
              required
              label="Full Name"
              name="name"
              autoFocus
              margin='dense'
              size='small'
            />
            <Typography variant="subtitle1" sx={{ marginBottom: '1px', marginTop: '2px' }}>User Name</Typography>

            <TextField
              fullWidth
              required
              label="User Name"
              name="userName"
              size='small'
              margin='dense'

            />
            <Typography variant="subtitle1" sx={{ marginBottom: '1px', marginTop: '2px' }}>Email Address</Typography>

            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              type="email"
              size='small'
              margin='dense'

            />
            <Typography variant="subtitle1" sx={{ marginBottom: '5px', marginTop: '2px' }}>User Group</Typography>


            <FormControl fullWidth>
              <InputLabel id="group-label">Choose User Group</InputLabel>
              <Select
                fullWidth
                required
                name="group"
                labelId="group-label"
                label="Choose User Group"
                margin='dense'
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                size='small'
                sx={{ '& .MuiSelect-select': { marginBottom: '10px' } }}
              >
                <InputLabel id={"group-label"}>Select Group</InputLabel>
                <MenuItem value={"Office"}>Office</MenuItem>
                <MenuItem value={"Managers"}>Managers</MenuItem>
                <MenuItem value={"HeadOffice"}>Head Office</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle1" sx={{ marginBottom: '5px', marginTop: '6px' }}>Assign Profile</Typography>
            <FormControl fullWidth>
              <InputLabel id="profile-label">Choose Profile</InputLabel>
              <Select fullWidth required name="profile" size='small'
                value={profile} onChange={(e) => setProfile(e.target.value)}
                sx={{ '& .MuiSelect-select': { marginBottom: '10px' } }}
                margin='dense' labelId='profile-label' label='Choose Profile' >
                <InputLabel id={"profile-label"}>Select Profile</InputLabel>
                <MenuItem value="Profile 1">Profile 1</MenuItem>
                <MenuItem value="Profile 2">Profile 2</MenuItem>
                <MenuItem value="Profile 3">Profile 3</MenuItem>
              </Select>
            </FormControl>
            {errorMessage && (
              <Alert severity="error" onClose={() => setErrorMessage('')}>
                {errorMessage}
              </Alert>
            )}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: "space-between" }}>
              <Button
                variant="text"
                onClick={(e) => {
                  e.preventDefault();
                  formRef.current.reset();
                  setErrorMessage('');
                }}
                sx={{
                  marginRight: '10px',
                  textDecoration: 'underline',
                  color: 'inherit', // to inherit the text color from the theme
                  '&:hover': {
                    backgroundColor: 'transparent', // remove hover background color
                  },
                }}
              >
                Reset Fields
              </Button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button onClick={handleClose} variant="contained" sx={{
                  backgroundColor: "#FAFBFB", color: '#000',
                  '&:hover': {
                    backgroundColor: "#FAFBFB", color: '#000',
                  }
                }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Add User
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal >
    </>
  );
};

export default AddUserModal;
