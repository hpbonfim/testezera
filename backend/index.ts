import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // EXAMPLE CREATE USER
  // await prisma.user.create({
  //   data: {
  //     name: 'helloworld',
  //     email: 't@t.com',
  //     posts: {
  //       create: { title: 'Hello World' },
  //     },
  //     profile: {
  //       create: { bio: 'I like dogs' },
  //     },
  //   },
  // })

  // EXAMPLE GET ALL USERS
  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // })
  // console.dir(allUsers, { depth: null })

  // EXAMPLE UPDATE USER BY ID
  // const post = await prisma.post.update({
  //   where: { id: 1 },
  //   data: { published: true },
  // })
  // console.log(post)
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })