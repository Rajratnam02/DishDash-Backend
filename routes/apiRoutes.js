import e from "express";
import {
  getCuisines,
  getRecipe,
  mealByCuisines,
  quickRecipe,
} from "../controllers/apiController.js";

const apiRoutes = e.Router();

apiRoutes.get("/cuisine", getCuisines);
apiRoutes.get("/quickRecipe", quickRecipe);
apiRoutes.get("/cusine/:cusinename", mealByCuisines);
apiRoutes.get("/recipe/:foodId", getRecipe);

export default apiRoutes;
