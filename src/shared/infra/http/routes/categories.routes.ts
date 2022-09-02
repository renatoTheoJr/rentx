import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryContoller } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

const listCategoryController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoryController.handle);

const importCategoryContoller = new ImportCategoryContoller();
categoriesRoutes.post(
    "/import",
    upload.single("file"),
    importCategoryContoller.handle
);
export { categoriesRoutes };
