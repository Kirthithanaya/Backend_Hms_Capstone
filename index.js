import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/dbConfig.js";
import authRoute from "./routes/authRoutes.js";
import roomRoute from "./routes/roomRoutes.js";
import residentRoute from "./routes/residentRoutes.js";
import billingRoute from "./routes/billingRoutes.js";
import financialRoute from "./routes/financialRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import integrationRoutes from "./routes/integrationRoutes.js"
import notificationRoute from "./routes/notificationRoutes.js"
import smsRoutes from "./routes/smsRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin:"https://frontend-hms-capstone-6esy.vercel.app"}));
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Backend");
});

app.use("/api/auth", authRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/residents", residentRoute);
app.use("/api/billing", billingRoute);
app.use("/api/financial", financialRoute);
app.use("/api/users", userRoutes);
app.use("/api/integration", integrationRoutes);
app.use("/api/notifications", notificationRoute);
app.use("/api/sms", smsRoutes);
app.use("/api/maintenance", maintenanceRoutes);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port `, port);
});
