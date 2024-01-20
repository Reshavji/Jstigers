// EditVendorPopup.js

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from '@material-ui/core';

const EditVendorPopup = ({ open, onClose, onEdit, vendor }) => {
  const [editedVendor, setEditedVendor] = useState({
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: '',
  });

  useEffect(() => {
    // Update the state when the vendor prop changes
    if (vendor) {
      setEditedVendor({
        vendorName: vendor.vendorName || '',
        bankAccountNo: vendor.bankAccountNo || '',
        bankName: vendor.bankName || '',
        addressLine1: vendor.addressLine1 || '',
        addressLine2: vendor.addressLine2 || '',
        city: vendor.city || '',
        country: vendor.country || '',
        zipCode: vendor.zipCode || '',
      });
    }
  }, [vendor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    onEdit(editedVendor);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Vendor Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Vendor Name*"
          name="vendorName"
          value={editedVendor.vendorName}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Bank Account No*"
          name="bankAccountNo"
          value={editedVendor.bankAccountNo}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Bank Name*"
          name="bankName"
          value={editedVendor.bankName}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Address Line 1"
          name="addressLine1"
          value={editedVendor.addressLine1}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address Line 2*"
          name="addressLine2"
          value={editedVendor.addressLine2}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="City*"
          name="city"
          value={editedVendor.city}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Country*"
          name="country"
          value={editedVendor.country}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Zip Code*"
          name="zipCode"
          value={editedVendor.zipCode}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEdit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditVendorPopup;
