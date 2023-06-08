import {Request, Response} from "express";
import { prismaClient } from "../../DataBase/prismaClient";

export class CategoryController {
    async create(request: Request, response: Response) {
        const { name, description, tenant } = request.body;
        const { id } = request.params;
        
        const createCategory = await prismaClient.category.create({
            data: {
                id,
                name,
                description,
                tenant
            }
        })

        return response.json(createCategory);
    }

    async show(request: Request, response: Response) {
      
        const readCategories = await prismaClient.category.findMany();

        return response.json(readCategories);
    }

    async put(request: Request, response: Response) {
        const { name, description } = request.body;
        const { id } = request.params;
        
        const updateCategories = await prismaClient.category.update({
            data: {
                name,
                description
            },
            where: {
                id
            }
        })

        return response.json(updateCategories);
    }    
    
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        
        const deleteCategories = await prismaClient.category.delete({
            where: {
                id
            }
        })

        return response.json(deleteCategories);
    }    
    
    async deleteAll(request: Request, response: Response) {
        
        const deleteAllCategories = await prismaClient.category.deleteMany();
        return response.json(deleteAllCategories);
    }    
}
