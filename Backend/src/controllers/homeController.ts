/** @format */
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// get all product
export const getAllProduct = async (req: any, res: any) => {
  const products = await prisma.product.findMany();
  res.json(products);
  console.log(products);
};

// get all category

export const getallcategory = async (req: any, res: any) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
  console.log(categories);
};
//   get all user
export const getallUser = async (req: any, res: any) => {
  const users = await prisma.user.findMany();
  res.json(users);
  console.log(users);
};
