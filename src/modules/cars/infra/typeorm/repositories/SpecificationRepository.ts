import { getRepository, Repository } from "typeorm";

import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;
    constructor() {
        this.repository = getRepository(Specification);
    }
    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name,
        });
        return specification;
    }
    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name,
        });
        await this.repository.save(specification);
    }
}

export { SpecificationRepository };
