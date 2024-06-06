import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ flexBasis: '200px' }}>
                            <Typography variant="h6" component="div">
                                Maaser Tracker
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/income">Income</Button>
                            <Button color="inherit" component={Link} to="/maaser">Maaser</Button>
                            <Button color="inherit" component={Link} to="/overview">Overview</Button>
                            <Button color="inherit" component={Link} to="/add-income">Add Income</Button>
                            <Button color="inherit" component={Link} to="/add-maaser">Add Maaser</Button>
                            <Button color="inherit" component={Link} to="/manage-sources">Manage Sources</Button>
                        </Box>
                        <Box sx={{ flexBasis: '200px' }} />
                    </Toolbar>
                </AppBar>
            </Box>
            {children}
        </>
    )
}

export default Layout;
