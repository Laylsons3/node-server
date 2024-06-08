const { PrismaClient } = require("@prisma/client");
const { configDotenv } = require("dotenv");
const express = require("express");
configDotenv();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("aqui, tudo certo!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("o servidor está rodando");
});
