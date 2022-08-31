import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecifictionUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const createSpecificationUseCase = container.resolve(
            CreateSpecifictionUseCase
        );
        await createSpecificationUseCase.execute({ name, description });
        return response.status(201).send();
    }
}

export { CreateSpecificationController };
