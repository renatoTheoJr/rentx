import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24hours = dayjs().add(2, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "1234",
            expected_return_date: dayAdd24hours,
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new renatl if there is another open to teh same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "12a4",
                expected_return_date: dayAdd24hours,
            });
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "1234",
                expected_return_date: dayAdd24hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new renatl if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "teste",
                car_id: "123",
                expected_return_date: dayAdd24hours,
            });
            await createRentalUseCase.execute({
                user_id: "test",
                car_id: "123",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new renatl with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "teste",
                car_id: "123",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
