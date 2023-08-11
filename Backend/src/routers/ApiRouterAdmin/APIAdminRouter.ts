/** @format */

import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  getallUser,
  addNewUser,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  AddProduct,
  UpdateProductByID,
  deleteProductByID,
  addCategory,
  deleteCategoryByID,
  addtransaction,
  updateCategoryByID,
} from "../../controllers/AdminController";
const prisma = new PrismaClient();

export const AdminRouter = Router();
AdminRouter.get("/", (req, res) => {
  res.send("Wellcome SAHIBA Admin");
});

//#region   API USER
// get all user

AdminRouter.get("/getallUser", getallUser);

AdminRouter.post("/adduser", addNewUser);

AdminRouter.get("/user/:id/drafts", getUserByID);

AdminRouter.put("/updateuser/:id", updateUserByID);

AdminRouter.delete("/deleteuser/:id", deleteUserByID);
//#endregion

AdminRouter.post(`/addproduct`, AddProduct);

AdminRouter.put("/updateproduct/:id", UpdateProductByID);
AdminRouter.delete("/deleteproduct/:id", deleteProductByID);

//#endregion

//#endregion

//#region API Categories

AdminRouter.post(`/addcategory`, addCategory);
AdminRouter.delete(`/deletecategory/:id`, deleteCategoryByID);
AdminRouter.put(`/updatecategory/:id`, updateCategoryByID);
//#endregion
//#region API transaction
AdminRouter.post("/addtransaction", addtransaction);
//#endregion
