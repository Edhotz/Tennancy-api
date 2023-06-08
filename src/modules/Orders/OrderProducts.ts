import {Request, Response} from "express";
import { prismaClient } from "../../DataBase/prismaClient";

export class orderProductsController {
    async create(request: Request, response: Response) {
        const { product_price, quantity, order, product } = request.body;
        const { id } = request.params;
        
        const createorderProducts = await prismaClient.orderProducts.create({
            data: {
                id,
                product_price,
                quantity,
                order,
                product
            }
        })

        return response.json(createorderProducts);
    }

    async show(request: Request, response: Response) {
      
        const readCategories = await prismaClient.orderProducts.findMany();

        return response.json(readCategories);
    }

    
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        
        const deleteCategories = await prismaClient.orderProducts.delete({
            where: {
                id
            }
        })

        return response.json(deleteCategories);
    }    
    
    async deleteAll(request: Request, response: Response) {
        
        const deleteAllCategories = await prismaClient.orderProducts.deleteMany();
        return response.json(deleteAllCategories);
    }    
}
