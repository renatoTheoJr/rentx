import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationRepository")
        private specicationsRepository: ISpecificationsRepository
    ) {}
    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExits = await this.carsRepository.findById(car_id);
        if (!carExits) {
            throw new AppError("Car does not exits");
        }

        const specifications = await this.specicationsRepository.findByIds(
            specifications_id
        );

        carExits.specifications = specifications;

        await this.carsRepository.create(carExits);
        return carExits;
    }
}

export { CreateCarSpecificationUseCase };
