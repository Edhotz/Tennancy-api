import {Request, Response} from "express";
import { prismaClient } from "../../DataBase/prismaClient";
import AppError from "../../Errors/AppError";
import { hash } from "bcryptjs";


export class TenantsController {
    async create(request: Request, response: Response) {
        const {id} = request.params;
        const {name, email, password, slug, main_color} = request.body;


        const hashedPassword = await hash(password, 10);

        const createTenant = await prismaClient.tenants.create({
            data: {
                id,
                name,
                email,
                slug,
                main_color,
                password: hashedPassword,


            }
        })

        console.log(createTenant);
        return response.json(createTenant);
    }


    async show(request: Request, response: Response) {
      
        const readTenants = await prismaClient.tenants.findMany();

        return response.json(readTenants);
    }

    async put(request: Request, response: Response) {
        const { email, password } = request.body;
        const { id } = request.params;
        
        const updateTenants = await prismaClient.tenants.update({
            data: {
                email,
                password
            },
            where: {
                id
            }
        })

        return response.json(updateTenants);
    }    
    
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        
        const deleteTenants = await prismaClient.tenants.delete({
            where: {
                id
            }
        })

        return response.json(deleteTenants);
    }    
    
    async deleteAll(request: Request, response: Response) {
        
        const deleteAllTenants = await prismaClient.tenants.deleteMany();
        return response.json(deleteAllTenants);
    }  
}