import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const VendorForm = () => {
  const initialVendorData = {
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: '',
  };

  const [vendorData, setVendorData] = useState(initialVendorData);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields = ['vendorName', 'bankAccountNo', 'bankName', 'addressLine2', 'city', 'country', 'zipCode'];
    const isValid = requiredFields.every(field => Boolean(vendorData[field]));
    setIsFormValid(isValid);
  }, [vendorData]);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success', // Can be 'success', 'error', 'warning', 'info'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Check if all required fields are filled
      if (!isFormValid) {
        setNotification({
          open: true,
          message: 'Please fill in all required fields.',
          severity: 'error',
        });
        return;
      }

      const response = await fetch('http://localhost:9000/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (response.ok) {
        setNotification({
          open: true,
          message: 'Data saved successfully!',
          severity: 'success',
        });

        // Clear the form after successful save
        setVendorData(initialVendorData);
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error during save:', error);
      setNotification({
        open: true,
        message: 'Error saving data. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCancel = () => {
    // Reset the form on cancel
    setVendorData(initialVendorData);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const handleSubmit = () => {
    handleSave();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Vendor Name*"
          name="vendorName"
          value={vendorData.vendorName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Bank Account No*"
          name="bankAccountNo"
          value={vendorData.bankAccountNo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Bank Name*"
          name="bankName"
          value={vendorData.bankName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Address Line 1*"
          name="addressLine1"
          value={vendorData.addressLine1}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Address Line 2*"
          name="addressLine2"
          value={vendorData.addressLine2}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="City*"
          name="city"
          value={vendorData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Country*"
          name="country"
          value={vendorData.country}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Zip Code*"
          name="zipCode"
          value={vendorData.zipCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <Button type="button" color="primary" variant="contained" onClick={handleSubmit} style={{ marginRight: 8 }}>
          Save
        </Button>
        <Button type="button" variant="contained" color="default" onClick={handleCancel}>
          Cancel
        </Button>
      </Grid>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <MuiAlert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default VendorForm;
