// Home.js
import React, { useState, useEffect } from 'react';
import { Box, Typography,Grid } from '@material-ui/core';
import VendorForm from './VendorForm/VendorForm';
import Header from'../Components/Header/Header';
import VendorList from './VendorList/VendorList';

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const styles = {
    home: {
      backgroundColor: "whitesmoke",
    },
    container: {
      marginTop: '20px',
      padding: '20px',
      display: 'flex',
      gap:'10px',
      flexDirection: 'column',
      alignItems: 'center',
    },
    heading: {
      marginBottom: '20px',
    },
    item: {
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', 
      marginBottom: '20px', 
    },
  };
  
  useEffect(() => {
    fetch('http://localhost:9000/vendors')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setVendors(data))
      .catch((error) => console.error('Error fetching vendors:', error));
  }, []);

console.log(vendors);
  return (
    <div style={styles.home}>
    <Header />
    <Box style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.heading}>
        Vendor Management
      </Typography>

      <Grid container spacing={2}>
        {/* First column for saving data */}
        <Grid item xs={12} md={6} style={styles.item}>
          <VendorForm />
        </Grid>

        {/* Second column for showing vendor list */}
        <Grid item xs={12} md={6} style={styles.item}>
          <VendorList />
        </Grid>
      </Grid>
    </Box>
  </div>
  );
};

export default Home;
