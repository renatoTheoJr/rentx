import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const specificationsRoutes = Router();
specificationsRoutes.use(ensureAuthenticated);

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
