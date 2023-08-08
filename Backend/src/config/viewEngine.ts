/** @format */
import path from "path";

const configViewEngine = (app: any) => {
  // config engine View
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");
};
export default configViewEngine;
