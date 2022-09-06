import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { carsRoutes } from "@shared/infra/http/routes/cars.route";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        name,
        description,
        daily_rate,
        category_id,
        fine_amount,
        brand,
        license_plate,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            category_id,
            fine_amount,
            brand,
            license_plate,
        });
        this.cars.push(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(
            (car) => car.license_plate === license_plate
        );
        return car;
    }

    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if (car.available === true) {
                let test = true;
                if (brand && car.brand !== brand) {
                    test = false;
                }
                if (category_id && car.category_id !== category_id) {
                    test = false;
                }
                if (name && car.name !== name) {
                    test = false;
                }
                if (test) {
                    return car;
                }
            }
            return null;
        });

        return cars;
    }
}

export { CarsRepositoryInMemory };
