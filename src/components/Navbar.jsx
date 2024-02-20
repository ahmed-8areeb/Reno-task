import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Menu, MenuItem } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CustomAvatar from './CustomAvatar';

const users = [
  "John Doe",
  "James Smith",
  "Maria Garcia",
  "David Brown",
  "Maria Rodriguez",
];

function Navbar({ isOpen, setIsOpen }) {

  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null); // Separate state for notifications menu
  const [user, setUser] = useState(users[0]);

  const handleMenuOpen = (event, menuType) => {
    if (menuType === 'user') {
      setUserAnchorEl(event.currentTarget);
    } else if (menuType === 'notifications') {
      setNotificationsAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = (menuType) => {
    if (menuType === 'user') {
      setUserAnchorEl(null);
    } else if (menuType === 'notifications') {
      setNotificationsAnchorEl(null);
    }
  };

  // Function to format date
  const formatDate = () => {
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date().toLocaleString('en-US', options);
  };

  return (
    <AppBar position="relative" color="default" sx={{ height: '60px', width: '100%' }}>
      <Toolbar sx={{ height: '100%' }}>
        <IconButton edge="start" color="inherit" onClick={() => setIsOpen((s) => !s)} sx={{
          transition: 'transform 0.3s ease',
          transform: !isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <MenuOpenIcon fontSize="large" />
        </IconButton>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {
            // check on the time and display the appropriate greeting Good Morning/Good Afternoon/Good Evening
            new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening"
          }
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2, flexGrow: 45 }}>
          {formatDate(new Date())}
        </Typography>
        <IconButton color="inherit" onClick={(event) => handleMenuOpen(event, 'user')}>
          <HelpOutlineOutlinedIcon />
        </IconButton>
        <IconButton color="inherit" onClick={(event) => handleMenuOpen(event, 'notifications')} sx={{ marginRight: '2px' }}>
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={userAnchorEl}
          open={Boolean(userAnchorEl)}
          onClose={() => handleMenuClose('user')}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {users.map((user, index) => (
            <MenuItem key={index} onClick={() => {
              handleMenuClose('user');
              setUser(users[index]);
            }}>{user}</MenuItem>
          ))}
        </Menu>

        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={() => handleMenuClose('notifications')}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem>notification 1</MenuItem>
          <MenuItem>notification 2</MenuItem>
          <MenuItem>notification 3</MenuItem>
          <MenuItem>notification 4</MenuItem>
          <MenuItem>notification 5</MenuItem>
        </Menu>

        <Typography sx={{ borderLeft: '2px solid #8d8f92', marginLeft: "4px" }}>
          <span style={{ marginLeft: '10px' }}>{user}</span>
        </Typography>
        <IconButton color="inherit" onClick={(event) => handleMenuOpen(event, 'user')}>
          <CustomAvatar name={user} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
