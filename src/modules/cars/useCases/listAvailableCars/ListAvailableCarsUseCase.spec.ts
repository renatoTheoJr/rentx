import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });
    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "C3",
            description: "Carro caro",
            daily_rate: 140,
            license_plate: "DEF-124",
            fine_amount: 200,
            brand: "Citroen",
            category_id: "54b4e7a6-dece-41e9-8b25-34fcdf3dd5c9",
        });
        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "C3",
            description: "Carro caro",
            daily_rate: 140,
            license_plate: "DEF-124",
            fine_amount: 200,
            brand: "Citroen",
            category_id: "54b4e7a6-dece-41e9-8b25-34fcdf3dd5c9",
        });
        await carsRepositoryInMemory.create({
            name: "C5",
            description: "Carro caro",
            daily_rate: 140,
            license_plate: "DEF-144",
            fine_amount: 200,
            brand: "Citroen",
            category_id: "54b4e7a6-dece-41e9-8b25-34fcdf3dd5c9",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "C3",
        });
        expect(cars).toEqual([car]);
    });

    it("should be able list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "C4",
            description: "Carro caro",
            daily_rate: 140,
            license_plate: "DEF-124",
            fine_amount: 200,
            brand: "Citroen",
            category_id: "54b4e7a6-dece-41e9-8b25-34fcdf3dd5c9",
        });
        await carsRepositoryInMemory.create({
            name: "C6",
            description: "Carro caro",
            daily_rate: 140,
            license_plate: "DEF-144",
            fine_amount: 200,
            brand: "Citroen1",
            category_id: "54b4e7a6-dece-41e9-8b25-34fcdf3dd5c9",
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: "Citroen",
        });
        expect(cars).toEqual([car]);
    });
    it("should be able list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "C4",
            description: "Carro caro",
            daily_rate: 140,
            license_plate: "DEF-124",
            fine_amount: 200,
            brand: "Citroen",
            category_id: "54b4e7a6-dece-41e9-8b25-34fcdf3dd5c9",
        });
        await carsRepositoryInMemory.create({
            name: "C6",
            description: "Carro caro",
            daily_rate: 140,
            license_plate: "DEF-144",
            fine_amount: 200,
            brand: "Citroen1",
            category_id: "541asas1",
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "54b4e7a6-dece-41e9-8b25-34fcdf3dd5c9",
        });
        expect(cars).toEqual([car]);
    });
});
