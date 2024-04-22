const route = require('express').Router();
const reservationController = require('../Controllers/reservationController');

// Creating a reservation
route.post("/create", reservationController.createReservation);

// You might want to add more routes here, such as getting reservations by userID

module.exports = route;
