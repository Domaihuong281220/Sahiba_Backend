/** @format */
import { AdminRouter } from "../routers/ApiRouterAdmin/APIAdminRouter";
import { PublicRouter } from "../routers/ApiPublicRouter/APIPublicRouter";
const configRouter = (app: any) => {
  // config router
  app.use("/admin", AdminRouter);
  app.use("/public", PublicRouter);
  app.use("/homepage", (req: any, res: any) => {
    res.render("homePage.ejs");
  });
  app.use((req: any, res: any) => {
    res.send("error page");
  });
};
export default configRouter;
