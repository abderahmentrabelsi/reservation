const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const fs = require('fs');
const path = require('path');
const CRM = require('./Models/crmModel'); // Adjust the path as necessary

// Models import - Ensuring DB models are loaded before the routes
require('./Models/index.js');

// Router imports
const PatientRouter = require('./Routes/patientRoute.js');
const reservationRoutes = require('./routes/reservationRoute');
const crmRoutes = require('./routes/crmRoute');

const PORT = process.env.PORT || 3000;

// Middleware to handle JSON payload parsing and provide detailed error handling for malformed JSON
app.use(express.json({
    error: (err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            return res.status(400).send({ error: 'Invalid JSON format' });
        }
        next();
    }
}));

// CORS configuration to allow requests from specific origins
app.use(cors({
    origin: [`${process.env.LOCALHOST}:3000`], // Ensure this matches your frontend's URL exactly
    credentials: true // To support cookies across different origins
}));

// Cookie parser middleware to handle cookies in HTTP requests
app.use(cookieParser());

// Routes
app.use('/api/patient', PatientRouter);
app.use('/reservations', reservationRoutes);
app.use('/crm', crmRoutes);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.LOCALHOST}:${PORT}`);
});



async function initializeCRMSettings() {
    const settingsExist = await CRM.findOne();
    if (!settingsExist) {
        const defaultLogoPath = path.join(__dirname, 'public/logo.jpeg');
        const defaultHeaderPath = path.join(__dirname, 'public/dr_wafa.jpeg');
        const newSettings = new CRM({
            logoImage: {
                data: fs.readFileSync(defaultLogoPath),
                contentType: 'image/jpeg'
            },
            headerImage: {
                data: fs.readFileSync(defaultHeaderPath),
                contentType: 'image/jpeg'
            }
        });
        await newSettings.save();
    }
}

// Call this function on server start
initializeCRMSettings().catch(err => {
    console.error('Failed to initialize CRM settings:', err);
});

