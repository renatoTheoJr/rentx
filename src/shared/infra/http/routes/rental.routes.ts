import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
export { rentalRoutes };

const devolutionRentalController = new DevolutionRentalController();
rentalRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);
