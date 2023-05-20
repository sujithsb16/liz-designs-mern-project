const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors")


const db = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");

app.use(cors());
app.use(express.json({ limit: "100mb" }));

dotenv.config();
db.connectDB();


app.use(express.json());
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};


app.use("/users", userRoutes);
app.use("/admin",adminRoutes)
app.use("/vendor", vendorRoutes);

    

app.use(notFound);
app.use(errorHandler);

// app.get("/", (req, res) => {
//   res.send("API is running");
// });
// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((e) => e._id === req.params.id);
//   res.json(note);
// });

const allowedHosts = ["example.com", "localhost", "127.0.0.1"];

// Set up a catch-all route for the development server
// app.use((req, res, next) => {
//   // Allow cross-origin requests from the specified hosts
//   if (allowedHosts.includes(req.hostname)) {
//     res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//   }
//   next();
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server has started in the port ${PORT}`));
