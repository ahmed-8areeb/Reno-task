import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from './Navbar';
import { useLocation, Outlet, NavLink } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const accordionData = [
  { id: 'atmsetting', label: 'ATM Setting', buttons: ['Withdraw'] },
  { id: 'businesssetup', label: 'Business Setup', buttons: ['Bank Systems'] },
  { id: 'usermanagement', label: 'User Management', buttons: ['Users', 'Profiles', 'Groups'] },
  { id: 'licensemanagement', label: 'License Management' }
];

export default function PersistentDrawerLeft() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState('');
  const [btnExpanded, setBtnExpanded] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currentUrl = location.pathname;
    switch (currentUrl) {
      case '/atmsetting/withdraw':
        setExpanded('atmsetting');
        setBtnExpanded('Withdraw');
        break;
      case '/businesssetup/banksystems':
        setExpanded('businesssetup');
        setBtnExpanded('Bank Systems');
        break;
      case '/usermanagement/users':
        setExpanded('usermanagement');
        setBtnExpanded('Users');
        break;
      case '/usermanagement/profiles':
        setExpanded('usermanagement');
        setBtnExpanded('Profiles');
        break;
      case '/usermanagement/groups':
        setExpanded('usermanagement');
        setBtnExpanded('Groups');
        break;
      default:
        setExpanded('');
        setBtnExpanded('');
        break;
    }
  }, [location.pathname]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  const handleButtonClick = (event) => {
    setBtnExpanded(event.currentTarget.textContent);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredAccordionData = accordionData.map((accordion) => ({
    ...accordion,
    buttons: accordion.buttons ? accordion.buttons.filter(button => button.toLowerCase().includes(searchTerm)) : []
  })).filter(item => item.label.toLowerCase().includes(searchTerm) || item.buttons.length > 0);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Navbar isOpen={open} setIsOpen={setOpen} />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{ sx: { backgroundColor: '#050E2D' } }}
      >
        <DrawerHeader sx={{ backgroundColor: '#050E2D', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5px' }}>
          <img src='../../public/renoLogo.png' alt="logo" style={{ width: '100px', height: '100px', marginBottom: '8px' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', backgroundColor: '#FFFFF', borderRadius: '15px', padding: '4px 4px 4px 4px' }}>
            <TextField
              label="Quick Access"
              variant="filled"
              fullWidth
              size="small"
              sx={{
                backgroundColor: '#FFFFFF',
                borderRadius: '15px',
              }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
                disableUnderline: true,
              }}
              onChange={handleSearch}
            />
          </Box>
          <Box sx={{ marginLeft: '0', display: 'flex', width: '100%', alignItems: 'center', marginTop: '8px', color: '#828796' }}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <IconButton sx={{ fontSize: 32, color: '#828796' }}>
                <DashboardIcon sx={{ fontSize: 32, color: '#828796' }} />
              </IconButton>
            </NavLink>
            <Typography variant="h5" color="textSecondary" sx={{ fontSize: 20, marginLeft: '0px', color: '#828796' }}>
              Dashboard
            </Typography>
          </Box>
        </DrawerHeader>
        <Divider />
        <div style={{ backgroundColor: '#050E2D', marginTop: '0' }}>
          <Typography variant="body" color="#828796">Settings</Typography>
          {filteredAccordionData.map((accordion) => (
            <Accordion
              key={accordion.id}
              sx={{
                backgroundColor: expanded === accordion.id ? '#22A565' : '#050E2D',
                color: expanded === accordion.id ? '#FFF' : '#828796'
              }}
              expanded={expanded === accordion.id}
              onChange={handleAccordionChange(accordion.id)}
            >
              <AccordionSummary
                expandIcon={accordion.id !== 'licensemanagement' ? <ExpandMoreIcon sx={{ color: expanded === accordion.id ? '#FFF' : '#828796' }} /> : null}
                aria-controls={accordion.id}
                id={accordion.id}
              >
                {accordion.label}
              </AccordionSummary>
              <AccordionDetails key={accordion.id} sx={{ backgroundColor: '#050E2D', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {accordion.buttons.map((button, index) => (
                  <NavLink key={index} to={`/${accordion.id}/${button.toLowerCase().replace(' ', '')}`} style={{ textDecoration: 'none', width: '100%' }}>
                    <Button
                      key={index}
                      color='secondary'
                      sx={{
                        width: '100%',
                        fontSize: '20px',
                        borderLeft: btnExpanded === button ? '3px green solid' : '',
                        textTransform: 'none',
                        marginRight: '30px',
                        color: btnExpanded === button ? '#4CAF50' : '#828796',
                        backgroundColor: btnExpanded === accordion.id ? '#22A565' : '#050E2D'
                      }}
                      onClick={handleButtonClick}
                    >
                      {button}
                    </Button>
                  </NavLink>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box >
  );
}
