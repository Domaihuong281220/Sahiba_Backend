/** @format */

import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { getallUser } from "../../controllers/homeController";

const prisma = new PrismaClient();

export const AdminRouter = Router();
AdminRouter.get("/", (req, res) => {
  res.send("Wellcome SAHIBA Admin");
});

//#region   API USER

// get all user

AdminRouter.get("/getallUser", getallUser);

AdminRouter.post("/adduser", async (req, res) => {
  const id = parseInt(req.body.id);
  const { name, email, password, avatar, address, phone, role } = req.body;
  const result = await prisma.user.create({
    data: {
      id,
      name,
      email,
      password,
      avatar,
      address,
      phone,
      role,
    },
  });
  res.json(result);
});

AdminRouter.get("/user/:id/drafts", async (req, res) => {
  const { id } = req.params;

  const drafts = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      cart: true,
    },
  });
  const ex = await drafts?.cart;
  if (ex == null) {
    res.json({ error: `User with ID ${id} does not exist in the database` });
  } else res.json(drafts);
});

AdminRouter.put("/updateuser/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, avatar, address, phone } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name,
      email,
      password,
      avatar,
      address,
      phone,
    },
  });
  res.json(user);
});
AdminRouter.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.json(user);
});
//#endregion

AdminRouter.post(`/addproduct`, async (req, res) => {
  const { id, name, price, description, image, categoryId } = req.body;
  const result = await prisma.product.create({
    data: {
      id,
      name,
      price,
      description,
      image,
      categoryId,
    },
  });
  res.json(result);
});

AdminRouter.put("/updateproduct/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  const result = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name,
      price,
      description,
      image,
    },
  });
  res.json(result);
});
AdminRouter.delete("/deleteproduct/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: { id: Number(id) },
  });
  res.json(product);
});

//#endregion

//#region API Cart
AdminRouter.put("/updatecart/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  const cart = await prisma.cart.update({
    where: { id: Number(id) },
    data: {
      name,
      price,
      description,
      image,
    },
  });
  res.json(cart);
});

//#endregion

//#region API Categories

AdminRouter.post(`/addcategory`, async (req, res) => {
  const { id, name, title } = req.body;
  const result = await prisma.category.create({
    data: {
      id,
      name,
      title,
    },
  });
  res.json(result);
});
AdminRouter.delete("/deletecategory/:id", async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.delete({
    where: { id: Number(id) },
  });
  res.json(category);
});
//#endregion

//#region API transaction
AdminRouter.post("/addtransaction", async (req, res) => {
  const { id, userId, productId, quantity, total } = req.body;
  const transaction = await prisma.transaction.create({
    data: {
      id,
      userId,
      productId,
      quantity,
      total,
    },
  });
  res.json(transaction);
});
//#endregion
