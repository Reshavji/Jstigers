const mongoose = require('mongoose');
const mongoURI = require('../config/monkoKEY');
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const vendorSchema = new mongoose.Schema({
  vendorName: String,
  bankAccountNo: String,
  bankName: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  country: String,
  zipCode: Number,
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = { Vendor, db };
