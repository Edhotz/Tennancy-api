import {Request, Response} from "express";
import { prismaClient } from "../../DataBase/prismaClient";

export class bannersController {
    async create(request: Request, response: Response) {
        const { image, tenant } = request.body;
        const { id } = request.params;
        
        const createbanners = await prismaClient.banners.create({
            data: {
                id,
                image,
                tenant
            }
        })

        return response.json(createbanners);
    }

    async show(request: Request, response: Response) {
      
        const readCategories = await prismaClient.banners.findMany();

        return response.json(readCategories);
    }

    async put(request: Request, response: Response) {
        const { image } = request.body;
        const { id } = request.params;
        
        const updateCategories = await prismaClient.banners.update({
            data: {
                image
            },
            where: {
                id
            }
        })

        return response.json(updateCategories);
    }    
    
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        
        const deleteCategories = await prismaClient.banners.delete({
            where: {
                id
            }
        })

        return response.json(deleteCategories);
    }    
    
    async deleteAll(request: Request, response: Response) {
        
        const deleteAllCategories = await prismaClient.banners.deleteMany();
        return response.json(deleteAllCategories);
    }    
}
