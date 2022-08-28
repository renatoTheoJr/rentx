import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryContoller } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = null;
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryContoller = new ImportCategoryContoller(
    importCategoryUseCase
);

export { importCategoryContoller };
