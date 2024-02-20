import Table from "../components/Table"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddUserModal from "../components/AddUserModal";
import { useState, useReducer, useEffect } from 'react';

const initialState = {
  data: [],
  status: 'loading',
  error: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        status: 'loading'
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        status: 'success'
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.payload
      };
    case 'UPDATE_DATA':
      return {
        ...state,
        status: 'loading'
      };
    default:
      throw new Error('Invalid action type');
  }
}

const BASE_URL = 'http://localhost:8000/';

function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  }

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_INIT' });
      const response = await fetch(`${BASE_URL}employees`);
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <AddUserModal isOpened={isOpen} handleClose={handleClose} fetchData={fetchData} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>User Management</h1>
        <Button onClick={() => setIsOpen(true)} variant="contained" sx={{
          color: '#FFF',
          backgroundColor: '#22A565',
          '&:hover': {
            backgroundColor: '#22A565',
            color: '#FFF',
          },
        }}>+ Add New</Button>
      </Box>
      <Table state={state} />
    </Box>
  )
}

export default Dashboard
