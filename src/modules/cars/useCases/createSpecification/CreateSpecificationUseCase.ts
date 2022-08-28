import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}
class CreateSpecifictionUseCase {
    constructor(private specificationRepository: ISpecificationsRepository) {}
    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists =
            this.specificationRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new Error("Specification already Excists!");
        }
        this.specificationRepository.create({ name, description });
    }
}
export { CreateSpecifictionUseCase };
