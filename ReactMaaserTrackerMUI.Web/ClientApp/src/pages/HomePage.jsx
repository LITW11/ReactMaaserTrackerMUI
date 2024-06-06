import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
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
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to the Maaser Tracker
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        עַשֵּׂר תְּעַשֵּׂר אֵת כָּל-תְּבוּאַת זַרְעֶךָ, הַיֹּצֵא הַשָּׂדֶה שָׁנָה שָׁנָה." - דברים י"ד, כ"ב"
      </Typography>
      <Box sx={{ margin: '20px 0' }}>
        <Button variant="contained" color="primary" component={Link} to="/income" sx={{ margin: '0 10px' }}>
          View Income
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/maaser" sx={{ margin: '0 10px' }}>
          View Maaser
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/add-income" sx={{ margin: '0 10px' }}>
          Add Income
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/add-maaser" sx={{ margin: '0 10px' }}>
          Add Maaser
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/manage-sources" sx={{ margin: '0 10px' }}>
          Manage Sources
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;
