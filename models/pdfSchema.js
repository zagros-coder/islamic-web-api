const mongoose = require("mongoose");

const PdfSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
},{ timestamps: true });

module.exports = mongoose.model("Pdf", PdfSchema);