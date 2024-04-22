const Reservation = require("../Models/reservationModel");
const Patient = require("../Models/patientModel"); // to check if user exists

module.exports = {
    createReservation: async (req, res) => {
        const { name, phoneNumber, email, date, message } = req.body;

        try {
            let userId = null; // default to null if user is not found
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
            res.status(500).json({ error: "Internal Server Error", details: error });
        }
    },

    // Additional controller methods can be defined here
};
