import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../erros/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

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
