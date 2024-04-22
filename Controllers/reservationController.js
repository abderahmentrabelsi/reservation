const Reservation = require("../Models/reservationModel");
const Patient = require("../Models/patientModel");

module.exports = {
    createReservation: async (req, res) => {
        const { name, phoneNumber, email, date, message } = req.body;

        // Simple validations can be extended here
        if (!name || !phoneNumber || !email || !date) {
            return res.status(400).json({ error: "All fields must be filled" });
        }

        try {
            let userId = null;
            const patient = await Patient.findOne({ email: email });
            if (patient) {
                userId = patient._id;
            }

            const newReservation = new Reservation({
                name,
                phoneNumber,
                email,
                date,
                message,
                userId
            });

            const savedReservation = await newReservation.save();
            res.status(201).json(savedReservation);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: "Internal Server Error", details: error });
        }
    },

    // Additional controller methods can be defined here
};
