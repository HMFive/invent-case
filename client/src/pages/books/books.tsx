import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { useGetBooksQuery } from '../../services/book-api';
export const Books = () => {
  const { data } = useGetBooksQuery();
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'title', headerName: 'Title', flex: 0.5 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'author',
      headerName: 'Author',
      flex: 0.3,
    },
    {
      field: 'year',
      headerName: 'Year',
      flex: 0.1,
    },
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

  const handleNavigation = async (bookId: number) => {
    navigate(`/books/${bookId}`);
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
