/** @format */

import { Response } from "express";
/** @format */
import { Prisma, PrismaClient } from "@prisma/client";
import { checkPrime } from "crypto";

const prisma = new PrismaClient();

//   get all user
export const getallUser = async (req: any, res: Response) => {
  try {
    let users = await prisma.user.findMany();

    if (users) {
      res.json(users).status(200);
    } else {
      return "no data";
    }
  } catch (error) {
    console.log(error);
  }
};

// Add User
export const addNewUser = async function (req: any, res: Response) {
  const { name, email, password, avatar, address, phone, role } = req.body;

  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password,
        avatar,
        address,
        phone,
        role,
      },
    });
    if (result) {
      res.json(result).status(200);
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};
// Get User by Id
export const getUserByID = async (req: any, res: any) => {
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
};
//  update User By ID
export const updateUserByID = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, avatar, address, phone, role } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
        avatar,
        address,
        phone,
        role,
      },
    });
    if (user) {
      res.json(user).status(200);
    } else {
      console.log("no data");
    }
  } catch (error) {
    console.log(error);
  }
};
// delete User By ID
export const deleteUserByID = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    if (user) {
      console.log("delete success");
      res.json(user).status(200);
    } else {
      console.log("wrong error  ", res.json().status(404));
    }
  } catch (error) {
    console.log(error);
  }
};
//#endregion

// Add new Product
export const AddProduct = async (req: any, res: Response) => {
  const { name, description, price, image, categoryId } = req.body;
  console.log(req.body);
  try {
    const result = await prisma.product.create({
      data: {
        name,
        price,
        description,
        image,
        categoryId,
      },
    });
    if (result) {
      res.json(result).status(200);
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

// Update Product By ID
export const UpdateProductByID = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const price = parseInt(req.body.price);
    console.log(req.body);
    const { name, description, image, categoryId } = req.body;
    const result = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        description,
        image,
        categoryId,
      },
    });
    if (result) {
      res.json(result);
      console.log("oke");
    } else {
      console.log("no data");
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete Prodoct By ID
export const deleteProductByID = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.product.delete({
      where: { id: Number(id) },
    });
    if (user) {
      console.log("delete success");
      res.json(user).status(200);
    } else {
      console.log("wrong error  ", res.json().status(404));
    }
  } catch (error) {
    console.log(error);
  }
};
//#endregion

//#endregion

//#region API Categories

// Add new Category
export const addCategory = async (req: any, res: Response) => {
  const { name, title } = req.body;

  try {
    const result = await prisma.category.create({
      data: {
        name,
        title,
      },
    });

    if (result) {
      console.log("add category success");
      res.json(result).status(200);
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete Category by ID
export const deleteCategoryByID = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.category.delete({
      where: { id: Number(id) },
    });
    if (user) {
      console.log("delete success");
      res.json(user).status(200);
    } else {
      console.log("wrong error  ", res.json().status(400));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoryByID = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { name, title } = req.body;
    const result = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name,
        title,
      },
    });
    if (result) {
      res.json(result).status(200);
    } else {
      console.log("not data");
    }
  } catch (error) {
    console.log(error);
  }
};
//#endregion

//#region API transaction
export const addtransaction = async (req: any, res: any) => {
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
};
// //#endregion
