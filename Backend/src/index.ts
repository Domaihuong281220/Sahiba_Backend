/** @format */

import { Prisma, PrismaClient } from "@prisma/client";
import express, { application } from "express";
const prisma = new PrismaClient();
import configViewEngine from "./config/viewEngine";
import configFileStatic from "./config/fileStatic";
import configcordHeader from "./config/cordHeader";
import configRouter from "./config/routerConfig";
import multer from "multer";
import appRoot from "app-root-path";
import path from "path";
import { handleUploadFile } from "./controllers/UserController";
import { imageFilter } from "./helpers/imageFilter";

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
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, appRoot + "/src/public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});
// const storage:
app.post("/upload", upload.single("profile-pic"), (req: any, res: any) => {
  const image = req.file.filename;

  try {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    }

    res.json({ image });
    // console.log("infomation", res.json());
  } catch (error) {
    console.log(error);
  }
});
app.post("/login", (req, res) => {
  res.send({ token: "123" });
});

const server = app.listen(8000, () =>
  console.log(`
🚀 Server ready at: http://103.157.218.126:8000/
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
