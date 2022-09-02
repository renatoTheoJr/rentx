import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

/**
 * Definir o tipo de retorno
 * Alterar o retorno de erro
 * Acessar o repositório
 * Retornar algo
 */

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);
        if (categoryAlreadyExists) {
            throw new AppError("Category already Exists!");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
