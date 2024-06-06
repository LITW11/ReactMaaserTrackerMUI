import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSourcesPage = () => {
  const [sources, setSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [editingSourceId, setEditingSourceId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteSourceId, setDeleteSourceId] = useState(null);

  const getSources = async () => {
    const { data } = await axios.get('/api/sources/getall');
    setSources(data);
  }

  useEffect(() => {
    getSources();
  }, []);

  const onAddClick = () => {
    setOpen(true);
    setModalText('');
    setEditingSourceId(null);
  }

  const onEditClick = source => {
    setOpen(true);
    setModalText(source.name);
    setEditingSourceId(source.id);
  }

  const handleClose = () => {
    setOpen(false);
    setModalText('');
  };

  const handleAddEdit = async () => {
    if (editingSourceId) {
      await axios.post('/api/sources/update', {name: modalText, id: editingSourceId});
    } else {
      await axios.post('/api/sources/add', {name: modalText});
    }
    await getSources();
    handleClose();
  };

  const handleDelete = async (id) => {
    const { data } = await axios.get(`/api/sources/hasincome?sourceId=${id}`);
    if (data.hasIncome) {
      setDeleteSourceId(id);
      setConfirmOpen(true);
    } else {
      await deleteSource(id);
    }
  };

  const deleteSource = async (id) => {
    await axios.post('/api/sources/delete', { id });
    await getSources();
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeleteSourceId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteSourceId) {
      await deleteSource(deleteSourceId);
    }
    handleConfirmClose();
  };

  return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Button onClick={() => onAddClick()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
            Add Source
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>
                      <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => onEditClick(source)}>Edit</Button>
                      <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(source.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>{editingSourceId ? 'Edit Source' : 'Add Source'}</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Source" type="text" fullWidth
                       value={modalText} onChange={(e) => setModalText(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddEdit} color="primary">
              {editingSourceId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth maxWidth="sm">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            This source has some income associated with it, are you sure you want to delete it?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
  );
}

export default ManageSourcesPage;
