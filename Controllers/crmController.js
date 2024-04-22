const CRM = require("../Models/crmModel");

module.exports = {
    getCRMSettings: async (req, res) => {
        try {
            const settings = await CRM.findOne();
            if (!settings) {
                return res.status(404).json({ error: "CRM settings not found." });
            }

            // Convert binary data to base64 for image display if data exists
            settings.logoImage = settings.logoImage.data ?
                `data:${settings.logoImage.contentType};base64,${settings.logoImage.data.toString('base64')}` :
                settings.logoImage.url;
            settings.headerImage = settings.headerImage.data ?
                `data:${settings.headerImage.contentType};base64,${settings.headerImage.data.toString('base64')}` :
                settings.headerImage.url;

            res.status(200).json(settings);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    updateCRMSettings: async (req, res) => {
        const updates = req.body;
        try {
            const settings = await CRM.findOneAndUpdate({}, updates, { new: true });
            res.status(200).json(settings);
        } catch (error) {
            res.status(500).json({ error: "Failed to update CRM settings", details: error });
        }
    },

    uploadImage: async (req, res) => {
        const { imageType } = req.body;  // 'logoImage' or 'headerImage'
        if (!req.file) return res.status(400).json({ error: "No file uploaded." });

        try {
            const settings = await CRM.findOne();
            if (!settings) return res.status(404).json({ error: "CRM settings not found." });

            settings[imageType] = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                url: ''  // Clear any default URL since binary data is being stored
            };

            await settings.save();
            res.status(200).json({ message: "Image uploaded successfully.", url: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` });
        } catch (error) {
            res.status(500).json({ error: "Error uploading image", details: error });
        }
    }
};
