const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    url: String,  // Store URL or leave blank if binary data is used
});

const crmSchema = new mongoose.Schema({
    instagramUrl: {
        type: String,
        required: true,
        default: "https://www.instagram.com/dr_wafazaiem/"
    },
    logoImage: imageSchema,
    headerImage: imageSchema,
    address: {
        type: String,
        default: "Centre Urbain Nord, Tunis, Résidence New Tower, 2eme Etage, Cabinet B2-4"
    },
    email: {
        type: String,
        default: "dr-wafazaiem@gmail.com"
    },
    phoneNumber: {
        type: String,
        default: "+216 53 44 65 14"
    },
    color: {
        type: String,
        default: "#E80675"
    }
}, {
    timestamps: true
});

const CRM = mongoose.model('CRM', crmSchema);

module.exports = CRM;
