const express = require('express');
const path = require('path');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
require('./passportLocal')(passport);
require('./googleAuth')(passport);
const userRoutes = require('./accountRoutes');
const cors = require('cors');
const { Vendor } = require('../model/vendors');

router.use(require('express-session')({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

const csrfProtection = csrf({ cookie: true });
router.use(csrfProtection);

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', 'Please Login to continue !');
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
        const vendors = await Vendor.find();
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

router.get('/logout', (req, res) => {
    req.logout();
    // Redirect to the home page
    res.redirect('http://localhost:3000/');
});


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    const csrfToken = req.csrfToken();
    res.redirect('http://localhost:3000/home');
});

router.get('/users', checkAuth, (req, res) => {
    const userData = {
        username: req.user.username,
        verified: req.user.isVerified
    };

    res.json(userData);
});

router.use(userRoutes);

module.exports = router;
