const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const bodyParser = require("body-parser");
// const jwt = require("express-jwt");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");

// const userRouter = require('./routes/userRoutes');
// const reviewRouter = require('./routes/reviewRoutes');
// const viewRouter = require('./routes/viewRoutes');

// const cookieParser = require('cookie-parser');

const app = express();

// app.use(cookieParser()); // parse data from cookies

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "https:", "http:", "data:", "ws:"],
            baseUri: ["'self'"],
            fontSrc: ["'self'", "https:", "http:", "data:"],
            scriptSrc: ["'self'", "https:", "http:", "blob:"],
            styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
        },
    })
);

//Body Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//This code uses the express-jwt middleware to check the JWT in the Authorization header
// app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ["/login"] }));
// *********************************************
// 1)GLOBAL MIDDLEWARES

// Set security HTTP header
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//limit requests from same API
// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000,
//     // allow 100 requests from the same IP in one HOUR

//     // incase the user make more 100 requests in one hour
//     message: "Too many requests from this IP, Please try again in an hour!",
// });
// app.use("/api", limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    next();
});

// 3) ROUTES

app.use("/", userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
