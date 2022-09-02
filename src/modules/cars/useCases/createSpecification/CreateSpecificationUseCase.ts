import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecifictionUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationsRepository
    ) {}
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new AppError("Specification already Excists!");
        }
        await this.specificationRepository.create({ name, description });
    }
}
export { CreateSpecifictionUseCase };
