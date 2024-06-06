import React, { useState, useEffect } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { formatDate, formatCurrency } from '../formatters';

const IncomePage = () => {

  const [groupBySource, setGroupBySource] = useState(false);
  const [incomePayments, setIncomePayments] = useState([]);

  useEffect(() => {
    const getIncomePayments = async () => {
      const { data } = await axios.get('/api/incomepayments/getall');
      setIncomePayments(data);
    }
    getIncomePayments();
  }, []);

  const groupIncomePayments = () => {
    const grouped = [];
    for (let incomePayment of incomePayments) {
      const { name } = incomePayment.incomeSource;
      const group = grouped.find(p => p.source === name);
      if (group) {
        group.incomes.push(incomePayment);
      } else {
        grouped.push({ source: name, incomes: [incomePayment] });
      }
    }

    return grouped;

    // return incomePayments.reduce((arr, incomePayment) => {
    //   const {name} = incomePayment.incomeSource;
    //   const group = arr.find(p => p.source === name);
    //   if (group) {
    //     group.incomes.push(incomePayment);
    //   } else {
    //     arr.push({ source: name, incomes: [incomePayment] });
    //   }

    //   return arr;
    // }, []);
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Income History
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={groupBySource}
            onChange={(event) => setGroupBySource(event.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Group by source"
      />

      {!groupBySource ? (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomePayments.map((incomePayment) => (
                <TableRow key={incomePayment.id}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                    {incomePayment.incomeSource.name}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{formatCurrency(incomePayment.amount)}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{formatDate(incomePayment.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        groupIncomePayments().map(({ source, incomes }) => (
          <div key={source} sx={{ width: '80%', maxWidth: '80%' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
              {source}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomes.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                        {income.incomeSource.name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{formatCurrency(income.amount)}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{formatDate(income.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      )}
    </Container>
  );
}

export default IncomePage;
