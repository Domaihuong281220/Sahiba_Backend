/** @format */
import { AdminRouter } from "../routers/ApiRouterAdmin/APIAdminRouter";
import { PublicRouter } from "../routers/ApiPublicRouter/APIPublicRouter";



const configRouter = (app: any) => {
  // config router
  app.use("/admin", AdminRouter);
  app.use("/public", PublicRouter);

};
export default configRouter;
