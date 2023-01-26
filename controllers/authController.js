const { promisify } = require("util");

const catchAsync = require("./../utils/catchAsync");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

// Sending JWT via cookie

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// const createSendToken = (user, statusCode, res) => {
//     const token = signToken(user._id);

//     // remove password from output on postman
//     user.password = undefined;

//     res.status(statusCode).json({
//         status: "success",
//         token,
//         data: { user },
//     });
// };

exports.signup = catchAsync(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(409).json({
            message: "Mail exists",
        });
    user = await User.create({
        email: req.body.email,
        password: req.body.password,
    });
    const token = signToken(user._id);
    user.password = undefined;

    res.cookie("JWT", token);
    res.status(201).json({
        status: "success",
        token,
        data: { user },
    });
    // createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password)
        return next(new AppError("Please Provide email and password", 400));
    // 2) Check if user exists && password is correct

    const user = await User.findOne({ email });
    // const correct = await user.correctPassword(password, user.password);
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password"), 401); //401 unauthorized
    }

    // 3)if everything ok, send token to client

    user.password = undefined;
    const token = signToken(user._id);

    res.cookie("JWT", token);
    res.header("auth-token", token).send("Logged in");
});

// exports.logout = (req, res) => {
//     // Destroy the session
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).send("Error logging out");
//         }
//         // Clear the user's auth token
//         res.clearCookie("auth-token");
//         // Redirect to the login page
//         res.redirect("/login");
//     });
// };

exports.protect = catchAsync(async (req, res, next) => {
    //1) Get the token and check of it's there

    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.token) {
        token = req.token;
    }

    if (!token)
        return next(
            new AppError(
                "You are't logged in! Please log in to get access ",
                401
            )
        );

    // 2) Verification the token
    //we use promisify to return a promise   promisify(jwt.verify)return a promise to await it
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
        return next(
            new AppError(
                "The user belonging to this user does no longer exist.",
                401
            )
        );

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

// exports.isLoggedIn = catchAsync(async (req, res, next) => {
//     if (req.cookies.jwt) {
//         // 1) Verification the token
//         const decoded = await promisify(jwt.verify)(
//             req.cookies.jwt,
//             process.env.JWT_SECRET
//         );

//         // 2) Check if user still exist
//         const currentUser = await User.findById(decoded.id);
//         if (!currentUser) return next();

//         //3) Check if user changed password after token  was issued
//         if (currentUser.changePasswordAfter(decoded.iat)) {
//             return next();
//         }

//         // THERE IS LOGGED USER
//         res.locals.user = currentUser;

//         return next();
//     }
//     next();
// });

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // implement your business logic
        // roles is array ex: ['admin','lead-guide']
        if (!roles.includes(req.user.role))
            return next(
                new AppError("You don't have the permission to do that", 403)
            );
        next();
    };
};
