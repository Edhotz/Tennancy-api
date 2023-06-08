import { Router } from "express";
import { CategoryController } from "./modules/Categories/CategoryController";
import { UsersController } from "./modules/Users/UsersController";
import UserSessions from "./modules/Users/UsersSessions";

const router = Router();

const category = new CategoryController();
const usersController = new UsersController()
const userSessions = new UserSessions();

router.post("/category", category.create);
router.get("/category", category.show);
router.put("/category/:id", category.put);
router.delete("/category/:id", category.delete);
router.delete("/category", category.deleteAll);

router.post("/users", usersController.create);
router.get("/users", usersController.show);
router.post("/login", userSessions.execute);

export { router };