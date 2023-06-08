import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { Request, Response } from "express";
import { prismaClient } from "../../DataBase/prismaClient";


export default class UserSessions { 
  async execute(req: Request, res: Response){
  const { email, password } = req.body;

  try {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = sign({ userId: user.id }, "464378647863y874jhgfjh$6565%&%&%&%656");

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
}
}

export class protectedRoute { 
  async execute(req: Request, res: Response) {
  // Middleware para verificar se o token de autenticação é válido
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const { userId } = verify(token, "seuSegredoAqui") as { userId: string };

    const user = await prismaClient.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token inválido" });
  }
  }
}

