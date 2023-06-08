import {Request, Response} from "express";
import { prismaClient } from "../../DataBase/prismaClient";

export class OrdersController {
    async create(request: Request, response: Response) {
        const { payment_method, payment_money_return, delivery_price, subtotal, status, order_date, user, tenant, Address } = request.body;
        const { id } = request.params;
        
        const createorders = await prismaClient.orders.create({
            data: {
                id,
                payment_method,
                payment_money_return,
                delivery_price,
                subtotal,
                order_date,
                status,
                user,
                tenant,
                Address
            }
        })

        return response.json(createorders);
    }

    async show(request: Request, response: Response) {
      
        const readCategories = await prismaClient.orders.findMany();

        return response.json(readCategories);
    }

    
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        
        const deleteCategories = await prismaClient.orders.delete({
            where: {
                id
            }
        })

        return response.json(deleteCategories);
    }    
    
    async deleteAll(request: Request, response: Response) {
        
        const deleteAllCategories = await prismaClient.orders.deleteMany();
        return response.json(deleteAllCategories);
    }    
}
