import {Request, Response} from "express";
import { prismaClient } from "../../DataBase/prismaClient";

export class productController {
    async create(request: Request, response: Response) {
        const { name, price, image, description, tenant } = request.body;
        const { id } = request.params;
        
        const createproduct = await prismaClient.product.create({
            data: {
                id,
                name,
                price,
                image,
                description,
                tenant
            }
        })

        return response.json(createproduct);
    }

    async show(request: Request, response: Response) {
      
        const readCategories = await prismaClient.product.findMany();

        return response.json(readCategories);
    }

    async put(request: Request, response: Response) {
        const { name, price } = request.body;
        const { id } = request.params;
        
        const updateCategories = await prismaClient.product.update({
            data: {
                name,
                price
            },
            where: {
                id
            }
        })

        return response.json(updateCategories);
    }    
    
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        
        const deleteCategories = await prismaClient.product.delete({
            where: {
                id
            }
        })

        return response.json(deleteCategories);
    }    
    
    async deleteAll(request: Request, response: Response) {
        
        const deleteAllCategories = await prismaClient.product.deleteMany();
        return response.json(deleteAllCategories);
    }    
}
