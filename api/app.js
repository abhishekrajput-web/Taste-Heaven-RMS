// import remote module from npm
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = 3000;

const app = express();
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

import connectDB from "./mongodb/connectDB.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import tableReservationRoute from './routes/tableReservationRoute.js';
import feedbackRoute from "./routes/feedbackRoute.js";

dotenv.config();

app.get("/", (req, res) => {
    res.status(200).json({message:"home route"});
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/tables",tableReservationRoute);
app.use("/api/v1/feedback",feedbackRoute);


const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URI);
        app.listen(PORT, () => {
         console.log(`server is running on port ${PORT}`);
        });        
    }

    catch(err){
        console.log(err || "some error in start server");
    }
}

startServer();

