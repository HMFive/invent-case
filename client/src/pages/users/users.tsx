import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { useGetUsersQuery } from '../../services/user-api';

export const Users = () => {
  const { data } = useGetUsersQuery();
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'created_at', headerName: 'Created At', flex: 0.5 },
    {
      field: 'action',
      headerName: '',
      renderCell: (params) => (
        <Button onClick={() => handleNavigation(Number(params.id))}>
          Detail
        </Button>
      ),
      flex: 0.5,
    },
  ];

  const handleNavigation = async (userId: number) => {
    navigate(`/users/${userId}`);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={data} columns={columns} />
        </Paper>
      </TableContainer>
    </>
  );
};
