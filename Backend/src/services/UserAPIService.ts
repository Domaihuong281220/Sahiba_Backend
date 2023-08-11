// /** @format */
// import { Prisma, PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const createNewUser = async () => {
//   const { name, email, password, avatar, address, phone, role } = req.body;

//   try {
//     const result = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password,
//         avatar,
//         address,
//         phone,
//         role,
//       },
//     });
//     if (result) {
//       res.json(result).status(200);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// const updateUser = async () => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// };
// const deleteUser = async () => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// };
