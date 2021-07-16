import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { sequelize } from "./db/models/index.js";
import {
  badRequestMiddleware,
  catchAllErrorsMiddleware,
  notFoundMiddleware,
} from "./errorMiddlewares.js";
import productRoutes from "../src/services/products/index.js";
import reviewRoutes from "../src/services/reviews/index.js";

const port = process.env.PORT || 5000;

const server = express();

// MIDDLEWARES
server.use(cors());
server.use(express.json());

// ROUTES
server.use("/products", productRoutes);
server.use("/reviews", reviewRoutes);

// ERROR
server.use(badRequestMiddleware);
server.use(notFoundMiddleware);
server.use(catchAllErrorsMiddleware);

console.table(listEndpoints(server));

sequelize
  .sync({ force: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on: ${port}`);
    });
    server.on("error", (error) => {
      console.log(`Server error: ${error}`);
    });
  })
  .catch((e) => console.log(e));
