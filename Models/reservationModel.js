const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    message: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
