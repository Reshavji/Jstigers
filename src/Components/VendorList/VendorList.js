import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditVendorPopup from '../EditVendorPopup/EditVendorPopup';
import MuiAlert from '@material-ui/lab/Alert';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // Can be 'success', 'error', 'warning', 'info'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/vendors');
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    fetchData();
  }, [vendors]);

  const handleDelete = async (vendorId) => {
    try {
      const response = await fetch(`http://localhost:9000/vendors/${vendorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If the deletion is successful, update the vendors state
        setVendors((prevVendors) =>
          prevVendors.filter((vendor) => vendor._id !== vendorId)
        );

        // Show Snackbar for successful deletion
        setSnackbar({
          open: true,
          message: 'Vendor deleted successfully!',
          severity: 'success',
        });
      } else {
        console.error('Error deleting vendor:', response.statusText);

        // Show Snackbar for deletion error
        setSnackbar({
          open: true,
          message: 'Error deleting vendor. Please try again.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  const handleEdit = (vendor) => {
    setEditPopupOpen(true);
    setSelectedVendor(vendor);
  };

  const handleEditSubmit = async (editedVendor) => {
    try {
      const response = await fetch(`http://localhost:9000/vendors/${selectedVendor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedVendor),
      });

      if (response.ok) {
        // If the update is successful, update the vendors state
        setVendors((prevVendors) =>
          prevVendors.map((vendor) =>
            vendor._id === selectedVendor._id ? editedVendor : vendor
          )
        );

        // Show Snackbar for successful update
        setSnackbar({
          open: true,
          message: 'Vendor updated successfully!',
          severity: 'success',
        });

        setEditPopupOpen(false);
        setSelectedVendor(null);
      } else {
        console.error('Error updating vendor:', response.statusText);

        // Show Snackbar for update error
        setSnackbar({
          open: true,
          message: 'Error updating vendor. Please try again.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vendor Name</TableCell>
            <TableCell>Bank Account No</TableCell>
            <TableCell>Bank Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor._id}>
              <TableCell>{vendor.vendorName}</TableCell>
              <TableCell>{vendor.bankAccountNo}</TableCell>
              <TableCell>{vendor.bankName}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(vendor)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(vendor._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditVendorPopup
        open={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        onEdit={handleEditSubmit}
        vendor={selectedVendor}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default VendorList;
