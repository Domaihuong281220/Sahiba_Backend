/** @format */
const configcordHeader = (app: any) => {
 
  app.use(function (req: any, res: any, next: any) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
};
export default configcordHeader;
