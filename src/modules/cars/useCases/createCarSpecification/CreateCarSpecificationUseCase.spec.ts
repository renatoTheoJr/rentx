import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecifcationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecifcationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specifcationsRepositoryInMemory: SpecifcationsRepositoryInMemory;
describe("Create Car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specifcationsRepositoryInMemory = new SpecifcationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specifcationsRepositoryInMemory
        );
    });
    it("Should not be able to add a new specification to a non-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["5432"];
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category_id",
        });

        const specefication = await specifcationsRepositoryInMemory.create({
            description: "test",
            name: "nameTest",
        });

        const specifications_id = [specefication.id];

        const specificationsCar = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCar).toHaveProperty("specifications");
        expect(specificationsCar.specifications.length).toBe(1);
    });
});
