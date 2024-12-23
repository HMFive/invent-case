import { Person } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useGetBookQuery } from '../../services/book-api';
import { useGetUsersQuery, useLendBookMutation } from '../../services/user-api';

export const BookDetail = () => {
  const { id } = useParams();
  const { data } = useGetBookQuery(Number(id));
  const { data: users } = useGetUsersQuery();
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');
  const [lendBookMutation] = useLendBookMutation();

  const handleLendBook = async (userId: number) => {
    try {
      await lendBookMutation({ userId: userId, bookId: id }).unwrap();
    } catch (e) {
      const error = e as { data: { error: string } };
      setError(error.data.error);
      setShowToast(true);
    } finally {
      setOpen(false);
    }
  };
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
        <DialogTitle>Choose User to Lend</DialogTitle>
        <List sx={{ pt: 0 }}>
          {users?.map((u) => (
            <ListItem disablePadding key={u.id}>
              <ListItemButton onClick={() => handleLendBook(u.id)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={u.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Paper sx={{ width: '100%', padding: 5 }}>
        <Typography variant="h2" textAlign="center">
          {data?.title}
        </Typography>
        {data?.currentOwner?.name && (
          <Typography variant="h6">
            Current Owner: {data?.currentOwner?.name}
          </Typography>
        )}
        <Typography variant="h6">Author: {data?.author}</Typography>
        <Typography variant="h6">Year: {data?.year}</Typography>
        <Typography variant="h6">{data?.description}</Typography>
        {data?.score !== -1 && (
          <Typography variant="h6">Avg Rating: {data?.score}</Typography>
        )}
        {!data?.currentOwner && (
          <Button variant="contained" onClick={() => setOpen(true)}>
            Lend the Book
          </Button>
        )}
      </Paper>
    </>
  );
};
