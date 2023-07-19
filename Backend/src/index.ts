/** @format */

import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// app.post(`/signup`, async (req, res) => {
//   const { name, email, posts } = req.body

//   const postData = posts?.map((post: Prisma.PostCreateInput) => {
//     return { title: post?.title, content: post?.content }
//   })

//   const result = await prisma.user.create({
//     data: {
//       name,
//       email,
//       posts: {
//         create: postData,
//       },
//     },
//   })
//   res.json(result)
// })

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       author: { connect: { email: authorEmail } },
//     },
//   })
//   res.json(result)
// })

// app.put('/post/:id/views', async (req, res) => {
//   const { id } = req.params

//   try {
//     const post = await prisma.post.update({
//       where: { id: Number(id) },
//       data: {
//         viewCount: {
//           increment: 1,
//         },
//       },
//     })

//     res.json(post)
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` })
//   }
// })

// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params

//   try {
//     const postData = await prisma.post.findUnique({
//       where: { id: Number(id) },
//       select: {
//         published: true,
//       },
//     })

//     const updatedPost = await prisma.post.update({
//       where: { id: Number(id) || undefined },
//       data: { published: !postData?.published },
//     })
//     res.json(updatedPost)
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` })
//   }
// })

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   })
//   res.json(post)
// })

// app.get('/user/:id/drafts', async (req, res) => {
//   const { id } = req.params

//   const drafts = await prisma.user
//     .findUnique({
//       where: {
//         id: Number(id),
//       },
//     })
//     .posts({
//       where: { published: false },
//     })

//   res.json(drafts)
// })

// app.get(`/post/:id`, async (req, res) => {
//   const { id }: { id?: string } = req.params

//   const post = await prisma.post.findUnique({
//     where: { id: Number(id) },
//   })
//   res.json(post)
// })

// app.get('/feed', async (req, res) => {
//   const { searchString, skip, take, orderBy } = req.query

//   const or: Prisma.PostWhereInput = searchString
//     ? {
//         OR: [
//           { title: { contains: searchString as string } },
//           { content: { contains: searchString as string } },
//         ],
//       }
//     : {}

//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//       ...or,
//     },
//     include: { author: true },
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     orderBy: {
//       updatedAt: orderBy as Prisma.SortOrder,
//     },
//   })

//   res.json(posts)
// })

//#region   API USER
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
  console.log(users);
});
app.post(`/adduser`, async (req, res) => {
  const { id, name, email, password, avatar, address, phone } = req.body;
  const result = await prisma.user.create({
    data: {
      id,
      name,
      email,
      password,
      avatar,
      address,
      phone,
    },
  });
  res.json(result);
});
app.get("/user/:id/drafts", async (req, res) => {
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
app.put("/updateuser/:id", async (req, res) => {
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
app.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.json(user);
});
//#endregion
//#region  API Product
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
  console.log(products);
});

app.post(`/addproducts`, async (req, res) => {
  const { id, name, price, description, image } = req.body;
  const result = await prisma.product.create({
    data: {
      id,
      name,
      price,
      description,
      image,
    },
  });
  res.json(result);
});

app.put("/updateproduct/:id", async (req, res) => {
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
app.delete("/deleteproduct/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: { id: Number(id) },
  });
  res.json(product);
});

//#endregion

//#region API Cart
app.put("/updatecart/:id", async (req, res) => {
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

app.post(`/addtocart`, async (req, res) => {
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
app.delete("/deletecart/:id", async (req, res) => {
  const { id } = req.params;
  const cart = await prisma.cart.delete({
    where: { id: Number(id) },
  });
  res.json(cart);
});

//#endregion

//#region API Categories
app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

app.get("/category/:id", async (req, res) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });
  res.json(category);
});

app.post(`/addcategory`, async (req, res) => {
  const { id, name } = req.body;
  const result = await prisma.category.create({
    data: {
      id,
      name,
    },
  });
  res.json(result);
});
app.delete("/deletecategory/:id", async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.delete({
    where: { id: Number(id) },
  });
  res.json(category);
});

//#endregion

//#region API Order
app.post(`/addorder`, async (req, res) => {
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
app.get("/orders", async (req, res) => {
  const orders = await prisma.order.findMany();
  res.json(orders);
});

app.get("/order/:id", async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
  });
  res.json(order);
});
app.delete("/deleteorder/:id", async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.delete({
    where: { id: Number(id) },
  });
  res.json(order);
});

app.put("/updateorder/:id", async (req, res) => {
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

//#region API transaction
app.post("/addtransaction", async (req, res) => {
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

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "Product 1",
    price: 100,
    description: "Product 1 description",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Product 2",
    price: 200,
    description: "Product 2 description",
    image: "https://picsum.photos/200/300",
  },
];

async function main() {
  // console.log(`Start seeding ...`);
  // for (const p of productData) {
  //   const product = await prisma.product.create({
  //     data: p,
  //   });
  // }
  // console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
