import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMaaserPage =() => {
    const navigate = useNavigate();

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = React.useState(new Date());

    const onAddClick = async () => {
        await axios.post('/api/maaserpayments/add', {recipient, amount, date});
        navigate('/maaser');
    }
    
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField value={recipient} onChange={e => setRecipient(e.target.value)} label="Recipient" variant="outlined" fullWidth margin="normal" />
            <TextField value={amount} onChange={e => setAmount(e.target.value)} label="Amount" variant="outlined" fullWidth type="number" margin="normal" />
            <TextField
                label="Date"
                type="date"
                value={dayjs(date).format('YYYY-MM-DD')}
                onChange={e => setDate(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={onAddClick}>Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
