/** @format */
import { Prisma, PrismaClient } from "@prisma/client";
import { json } from "body-parser";
import { error } from "console";
import { Response } from "express";
import multer from "multer";

const prisma = new PrismaClient();

// get all product
export const getAllProduct = async (req: any, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    if (products) {
      res.json(products).status(200);
    }
  } catch (error) {
    console.log(error);
  }
};

// get all category

export const getallcategory = async (req: any, res: any) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
  console.log(categories);
};
//#region API Cart
export const UpdateCart = async (req: any, res: any) => {
  const { id } = req.params;
  const price = parseInt(req.body.price);
  const { name, description, image } = req.body;
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
};

export let getUploadFilePage = async (req: any, res: Response) => {
  return res.render("uploadfile.ejs");
};

export let handleUploadFile = async (req: any, res: any) => {
  // console.log(req.file);
  

  // Display uploaded image for user validation
};
