const mongoose = require('mongoose');

const CertificateSchema = mongoose.Schema({
    _id: String,
    fullName: String,
    email: String,
    verifyURL: String,
    verifyQR: String,
    skillBoostQR: String,
    certificate: String
});

const Certificate = mongoose.model('Certificate', CertificateSchema)
module.exports = Certificate