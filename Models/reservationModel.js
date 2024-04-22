const mongoose = require('mongoose');
const validator = require('validator');

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Must be exactly 8 digits.`
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                return v >= new Date();
            },
            message: 'Reservation date must be in the future.'
        }
    },
    message: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null }
}, {
    timestamps: true  // Mongoose uses this option to automatically manage createdAt and updatedAt fields
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
