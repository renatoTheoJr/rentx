import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalByUser/listRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

const devolutionRentalController = new DevolutionRentalController();
rentalRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);

const listRentalsByUserController = new ListRentalsByUserController();
rentalRoutes.get(
    "/users",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalRoutes };
