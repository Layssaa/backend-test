import "reflect-metadata";
import express from "express";
import { routers, routersProtected } from "./routes";
import { DbSource } from "./database/data-source";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res, next) => {
  console.log("REQUEST ");

  console.log(req.url);

  console.log(req.body);
  next();
});

app.use(routers);
app.use(routersProtected);

DbSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(3000, () => {
  console.log("Server is running");
});
