import {Request, Response} from "express";
import { prismaClient } from "../../DataBase/prismaClient";
import AppError from "../../Errors/AppError";
import { hash } from "bcryptjs";


export class UsersController {
    async create(request: Request, response: Response) {
        const {id} = request.params;
        const {email, password} = request.body;


        const hashedPassword = await hash(password, 10);

        const createUser = await prismaClient.user.create({
            data: {
                id,
                email,
                password: hashedPassword,
            }
        })

        console.log(createUser);
        return response.json(createUser);
    }


    async show(request: Request, response: Response) {
      
        const readUsers = await prismaClient.user.findMany();

        return response.json(readUsers);
    }

    async put(request: Request, response: Response) {
        const { email, password } = request.body;
        const { id } = request.params;
        
        const updateusers = await prismaClient.user.update({
            data: {
                email,
                password
            },
            where: {
                id
            }
        })

        return response.json(updateusers);
    }    
    
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        
        const deleteusers = await prismaClient.user.delete({
            where: {
                id
            }
        })

        return response.json(deleteusers);
    }    
    
    async deleteAll(request: Request, response: Response) {
        
        const deleteAllusers = await prismaClient.user.deleteMany();
        return response.json(deleteAllusers);
    }  
}