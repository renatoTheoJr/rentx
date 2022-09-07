import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

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
        specifications,
        id,
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
            specifications,
            id,
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
    async findById(car_id: string): Promise<Car> {
        return this.cars.find((car) => car.id === car_id);
    }
}

export { CarsRepositoryInMemory };
