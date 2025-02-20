import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      firstname: "Alice",
      lastname: "Smith",
      email: "alice.smith@example.com",
      password: "password123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: "Bob",
      lastname: "Johnson",
      email: "bob.johnson@example.com",
      password: "password123",
    },
  });

  const todoStatus = await prisma.status.create({
    data: {
      name: "To Do",
      color: "gray",
    },
  });

  const inProgressStatus = await prisma.status.create({
    data: {
      name: "In Progress",
      color: "blue",
    },
  });

  const doneStatus = await prisma.status.create({
    data: {
      name: "Done",
      color: "green",
    },
  });

  const project = await prisma.project.create({
    data: {
      name: "Project Alpha",
      description: "A new project for testing purposes",
      startDate: new Date(),
    },
  });

  await prisma.userProject.create({
    data: {
      userId: user1.id,
      projectId: project.id,
      role: "Manager",
    },
  });

  await prisma.userProject.create({
    data: {
      userId: user2.id,
      projectId: project.id,
      role: "Developer",
    },
  });

  const task1 = await prisma.task.create({
    data: {
      projectId: project.id,
      title: "Initial Setup",
      description: "Set up the project environment and dependencies",
      statusId: todoStatus.id,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      projectId: project.id,
      title: "Design Database Schema",
      description: "Design the initial database schema for the project",
      statusId: inProgressStatus.id,
    },
  });

  await prisma.userTask.create({
    data: {
      userId: user1.id,
      taskId: task1.id,
    },
  });

  await prisma.userTask.create({
    data: {
      userId: user2.id,
      taskId: task2.id,
    },
  });

  await prisma.comment.create({
    data: {
      taskId: task1.id,
      userId: user1.id,
      content: "Started working on the environment setup.",
    },
  });

  await prisma.comment.create({
    data: {
      taskId: task2.id,
      userId: user2.id,
      content: "Working on the database schema design.",
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
