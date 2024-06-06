import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddIncomePage = () => {

    const navigate = useNavigate();

    const [sources, setSources] = useState([]);
    
    const [selectedSource, setSelectedSource] = useState(null);
    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(new Date());

    const onAddClick = async () => {
        await axios.post('/api/incomepayments/add', {
            incomeSourceId: selectedSource.id,
            amount,
            date
        });
        navigate('/income');
    }

    useEffect(() => {
        const getSources = async () => {
            const { data } = await axios.get('/api/sources/getall');
            setSources(data);
        }
        getSources();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(option) => option.name}
                fullWidth
                margin="normal"
                onChange={(e, value) => setSelectedSource(value)}
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                onChange={e => setAmount(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Date"
                type='date'
                value={dayjs(date).format('YYYY-MM-DD')}
                onChange={e => setDate(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={onAddClick}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
