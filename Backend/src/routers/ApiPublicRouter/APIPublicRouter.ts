/** @format */

import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  UpdateCart,
  getAllProduct,
  getallcategory,
} from "../../controllers/UserController";
const prisma = new PrismaClient();

export const PublicRouter = Router();
PublicRouter.get("/", (req, res) => {
  res.send("Wellcome SAHIBA Public");
});

// Get all Product
PublicRouter.get("/getallproduct", getAllProduct);

// Get all category
PublicRouter.get("/getallcategory", getallcategory);

//#region API Cart
PublicRouter.put("/updatecart/:id", UpdateCart);
//#region  API Cart
PublicRouter.post(`/addtocart`, async (req, res) => {
  const { id, name, price, description, image, userId } = req.body;
  const result = await prisma.cart.create({
    data: {
      id,
      name,
      price,
      description,
      image,
      userId,
    },
  });
  res.json(result);
});
PublicRouter.delete("/deletecart/:id", async (req, res) => {
  const { id } = req.params;
  const cart = await prisma.cart.delete({
    where: { id: Number(id) },
  });
  res.json(cart);
});
//#endregion End API Cart

//#region API Order
PublicRouter.post(`/addorder`, async (req, res) => {
  const { id, userId, productId, quantity } = req.body;
  const result = await prisma.order.create({
    data: {
      id,
      userId,
      productId,
      quantity,
    },
  });
  res.json(result);
});
PublicRouter.get("/orders", async (req, res) => {
  const orders = await prisma.order.findMany();
  res.json(orders);
});

PublicRouter.get("/order/:id", async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
  });
  res.json(order);
});
PublicRouter.delete("/deleteorder/:id", async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.delete({
    where: { id: Number(id) },
  });
  res.json(order);
});

PublicRouter.put("/updateorder/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, productId, quantity } = req.body;
  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: {
      userId,
      productId,
      quantity,
    },
  });
  res.json(order);
});
//#endregion
