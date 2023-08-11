/** @format */

import { Prisma, PrismaClient } from "@prisma/client";
import express, { application } from "express";
const prisma = new PrismaClient();
import configViewEngine from "./config/viewEngine";
import configFileStatic from "./config/fileStatic";
import configcordHeader from "./config/cordHeader";
import configRouter from "./config/routerConfig";


var app = express();
// Config body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config engine View
configViewEngine(app);
// config static file
configFileStatic(app);
// config cord header
configcordHeader(app);
//config routers
configRouter(app);
async function main() {}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

const server = app.listen(8000, () =>
  console.log(`
🚀 Server ready at: http://103.157.218.126:8000/
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
