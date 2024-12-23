import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Paper,
  Rating,
  Snackbar,
  TableContainer,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useParams } from 'react-router';
import {
  useGetUserQuery,
  useReturnBookMutation,
} from '../../services/user-api';
export const UserDetail = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { data } = useGetUserQuery(Number(id));
  const [rating, setRating] = useState<number | null>(0);
  const [bookId, setBookId] = useState<number | null>();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');
  const [returnBookMutation] = useReturnBookMutation();

  const presentColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'title', headerName: 'Name', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 0.5 },
    { field: 'year', headerName: 'Year', flex: 0.3 },
    {
      field: 'action',
      headerName: '',
      renderCell: (params) => (
        <Button onClick={() => handleReturnBook(Number(params.id))}>
          Return
        </Button>
      ),
      flex: 0.5,
    },
  ];

  const handleReturnBook = async (bookId: number) => {
    setBookId(bookId);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please choose rating');
      setShowToast(true);
    } else {
      try {
        await returnBookMutation({
          userId: id,
          bookId: bookId,
          rating,
        }).unwrap();
      } catch (e) {
        const error = e as { data: { error: string } };
        setError(error.data.error);
        setShowToast(true);
      } finally {
        setOpen(false);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'title', headerName: 'Name', flex: 0.5 },
    { field: 'author', headerName: 'Author', flex: 0.3 },
    { field: 'year', headerName: 'Year', flex: 0.1 },
    { field: 'rating', headerName: 'Rating', flex: 0.1 },
    { field: 'checked_at', headerName: 'Checked At', flex: 0.5 },
    { field: 'created_at', headerName: 'Returned At', flex: 0.5 },
  ];
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showToast}
        onClose={() => setShowToast(false)}
        autoHideDuration={2000}
        message={error}
      />
      <Dialog open={open}>
        <DialogTitle>Rate the book before returning</DialogTitle>

        <div style={{ margin: '0 auto' }}>
          <Rating
            name="customized-10"
            style={{ padding: 20 }}
            precision={0.5}
            onChange={(_event, newValue) => setRating(newValue)}
            max={10}
            size="large"
          />
        </div>
        <div
          style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Button size="large" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </Dialog>
      <Avatar
        sx={{ bgcolor: '#f50057', height: 64, width: 64 }}
        style={{ margin: '0 auto' }}
      >
        {data?.name[0]}
      </Avatar>
      <Typography variant="h5" textAlign={'center'}>
        {data?.name}
      </Typography>
      <br></br>
      <Typography variant="h5">Current Books</Typography>
      <br></br>
      <TableContainer component={Paper}>
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={data?.books.present} columns={presentColumns} />
        </Paper>
      </TableContainer>
      <br></br>

      <Typography variant="h5">Returned Books</Typography>
      <br></br>

      <TableContainer component={Paper}>
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={data?.books?.past} columns={columns} />
        </Paper>
      </TableContainer>
    </>
  );
};
