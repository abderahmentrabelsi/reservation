const CRM = require("../Models/crmModel");

module.exports = {
    getCRMSettings: async (req, res) => {
        try {
            const settings = await CRM.findOne();
            if (!settings) {
                return res.status(404).json({ error: "CRM settings not found." });
            }
            // Convert Buffer to base64 for easy image transmission
            if (settings.logoImage) {
                settings.logoImage = Buffer.from(settings.logoImage.data).toString('base64');
            }
            if (settings.headerImage) {
                settings.headerImage = Buffer.from(settings.headerImage.data).toString('base64');
            }
            res.status(200).json(settings);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    updateCRMSettings: async (req, res) => {
        const updates = req.body; // This could include any of the CRM fields
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
                contentType: req.file.mimetype
            };

            await settings.save();
            res.status(200).json({ message: "Image uploaded successfully." });
        } catch (error) {
            res.status(500).json({ error: "Error uploading image", details: error });
        }
    }
};
