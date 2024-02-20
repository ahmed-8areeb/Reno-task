import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import EditIcon from '@mui/icons-material/Edit';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import LockIcon from '@mui/icons-material/Lock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Error from './Error';
import CustomAvatar from './CustomAvatar';
import Spinner from "../components/Spinner";

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

function Table({ state }) {
  const { data, status, error } = state;
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
  };

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        size: '200',
        filterFn: 'startsWith',
        Cell: ({ cell }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar name={cell.getValue()} />
            <span style={{ marginLeft: '8px' }}>{cell.getValue()}</span>
          </div>
        )
      },
      {
        header: 'User Name',
        accessorKey: 'userName',
        size: '150',
        filterFn: 'startsWith',
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
        size: '200',
        filterFn: 'startsWith',
        enableClickToCopy: true,
        filterVariant: 'autocomplete',
      },
      {
        header: 'Group',
        accessorKey: 'group',
        size: '170',
        filterFn: 'startsWith',

      },
      {
        header: 'Status',
        id: 'status',
        accessorKey: 'status',
        size: '120',
        filterVariant: 'multi-select',
        filterSelectOptions: ['Active', 'Inactive', 'Locked'],
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.createdOn),
        id: 'createdOn',
        header: 'Created On',
        accessor: 'createdOn',
        size: '180',
        filterVariant: 'date-range',
        Cell: ({ cell }) => {
          const formattedDate = new Date(cell.getValue()).toLocaleDateString('en-US', {
            month: 'short', // Abbreviated month name
            day: '2-digit', // Two-digit day of the month
            year: 'numeric' // Full numeric year
          });
          return formattedDate;
        }
      }
    ],
    []
  );


  const table = useMaterialReactTable({
    columns, data, initialState: { showColumnFilters: false }, enableRowSelection: true, enableColumnOrdering: true, enableColumnFilterModes: true,
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton sx={{ color: '#51576D', backgroundColor: '#E7E9EF', marginRight: '8px', borderRadius: '4px', height: '34px', width: '34px' }}  > <EditIcon /></IconButton>
        <IconButton sx={{ color: '#51576D', backgroundColor: '#E7E9EF', marginRight: '8px', borderRadius: '4px', height: '34px', width: '34px' }} ><NotInterestedOutlinedIcon /></IconButton>
        <IconButton sx={{ color: '#51576D', backgroundColor: '#E7E9EF', marginRight: '8px', borderRadius: '4px', height: '34px', width: '34px' }}> <LockIcon /></IconButton>
        <Button sx={{ color: '#51576D', backgroundColor: '#E7E9EF', marginRight: '8px', borderRadius: '4px', textTransform: 'none' }}>Assign to Profile</Button>
        <Button sx={{ color: '#51576D', backgroundColor: '#E7E9EF', marginRight: '8px', borderRadius: '4px', textTransform: 'none' }}>Assign to Group</Button>
        <IconButton sx={{ color: '#51576D', backgroundColor: '#E7E9EF', marginRight: '8px', borderRadius: '4px', height: '34px', width: '34px' }}> <MoreVertIcon /></IconButton>
        <Button sx={{ color: '#51576D', backgroundColor: '#E7E9EF', marginRight: '8px', textTransform: 'none' }} onClick={handleExportData} startIcon={<FileDownloadIcon />}>
          CSV
        </Button>
        <Button sx={{ color: '#51576D', backgroundColor: '#E7E9EF', textTransform: 'none' }} disabled={table.getPrePaginationRowModel().rows.length === 0} onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)} startIcon={<FileDownloadIcon />}>
          PDF
        </Button>
      </Box>
    ),

  });

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {status === 'loading' && <Spinner />}
        {status === 'error' && <Error><span>💥</span> {error}</Error>}
      </div>
      {status === 'success' && <MaterialReactTable table={table} />}
    </>
  )
}

export default Table
