const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
    subject: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

grievanceSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "email",
    });
    next();
});

module.exports = mongoose.model("Grievance", grievanceSchema);
