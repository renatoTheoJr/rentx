import { Router } from "express";

import { authenticateRoutes } from "./authenticate.route";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specification.route";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);
export { router };
