import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { formatCurrency } from '../formatters';

const OverviewPage = () => {

  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const getOverview = async () => {
      const { data } = await axios.get('/api/maaserpayments/getoverview');
      setOverview(data);
    }

    getOverview();
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center'
      }}
    >

      <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
        {!!overview ? <>
          <Typography variant="h2" gutterBottom>
            Overview
          </Typography>
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Total Income: {formatCurrency(overview.totalIncome)}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Total Maaser: {formatCurrency(overview.totalMaaser)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>
              Maaser Obligated: {formatCurrency(overview.obligatedAmount)}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Remaining Maaser obligation: {overview.remainingObligation < 0 ? "$0.00" : formatCurrency(overview.remainingObligation)}
            </Typography>
          </Box>
        </> : <>
          <Typography variant="h5" gutterBottom>
            Loading...
          </Typography></>
        }
      </Paper>
    </Container>
  );
}

export default OverviewPage;
