const User = require("../models/User");
const Grievance = require("../models/Grievance");
const catchAsync = require("../utils/catchAsync");

exports.getAllUser = catchAsync(async (req, res, next) => {
    const users = await User.find().sort({ createdAt: "desc" }).lean();
     res.status(201).json(users);
});

exports.doGrievance = catchAsync(async (req, res) => {
    const grivance = await Grievance.create({
        user: req.user,
        subject: "X",
    });
    res.status(200).json({
        status: "success",
        message: "Grievance created successfully",
    });
});

exports.getAllGrievanceUsers = catchAsync(async (req, res, next) => {
    const users = await Grievance.find({}).sort({ createdAt: "desc" }).lean();
   res.status(201).json(users);
});
