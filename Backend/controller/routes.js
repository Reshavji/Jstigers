const express = require('express');
const router = express.Router();
const csrf = require('csurf'); // Import csurf library
const passport = require('passport');
require('./passportLocal')(passport);
require('./googleAuth')(passport);
const userRoutes = require('./accountRoutes');
const cors = require('cors');
const { Vendor, db } = require('../model/vendors');
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/');
    }
}

router.use(cors());
// Route to save vendor data
router.post('/vendors', async (req, res) => {
    try {
      const newVendor = new Vendor(req.body);
      await newVendor.save();
      res.status(201).json({ message: 'Vendor saved successfully' });
    } catch (error) {
      console.error('Error during save:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Route to get all vendors
  router.get('/vendors', async (req, res) => {
    try {
      const vendors = await Vendor.find(); // Fetch vendors from the database
      res.json(vendors);
    } catch (error) {
      console.error('Error during fetch:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // Route to delete a vendor by ID
router.delete('/vendors/:id', async (req, res) => {
    const vendorId = req.params.id;

    try {
        // Use findByIdAndDelete to find and remove the vendor by ID
        const deletedVendor = await Vendor.findByIdAndDelete(vendorId);

        if (deletedVendor) {
            res.json({ message: 'Vendor deleted successfully' });
        } else {
            res.status(404).json({ error: 'Vendor not found' });
        }
    } catch (error) {
        console.error('Error during delete:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to update a vendor by ID
router.put('/vendors/:id', async (req, res) => {
    const vendorId = req.params.id;

    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, req.body, { new: true });

        if (updatedVendor) {
            res.json({ message: 'Vendor updated successfully', vendor: updatedVendor });
        } else {
            res.status(404).json({ error: 'Vendor not found' });
        }
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index", { logged: true, csrfToken: req.csrfToken() });
    } else {
        res.render("index", { logged: false });
    }
});


router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('http://localhost:3000/home');
});

router.get('/users', checkAuth, (req, res) => {
    // Adding a new parameter for checking verification
    const userData = {
        username: req.user.username,
        verified: req.user.isVerified
    };

    res.json(userData);
});




router.use(userRoutes);

module.exports = router;