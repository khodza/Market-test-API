const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerUi = require('swagger-ui-express');
//SECURITY MODULES

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const swaggerSpec = require('./swagger/swaggerOpt');
//ERROR CONTROLLER
const globalErrorController =require('./controllers/errorController')
//ROUTES
const authRoutes = require('./routes/auth.route');
const userRoutes =require('./routes/users.route');
const productRoutes =require('./routes/product.route');
const orderRoutes =require('./routes/orders.route')

//APP
const app =express();
//ENABLING CORS
app.use(cors());

app.use(helmet());

//LOGGING REQ IN DEV MODE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP. Please try again in hour ",
  });

app.use("/api", limiter);

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());

// app.use(
//     hpp({
//       whitelist: ["book"],
//     })
//   );

//DOCUMENTATION

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//CONNECTING ROUTES

app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

app.all("*", (req, res, next) => {
    res.status(404).json({
      status: "failed",
      message: `Can not find ${req.originalUrl} on this server!`,
    });
  });

//GLOBAL ERROR HANDLER

app.use(globalErrorController);
module.exports =app;